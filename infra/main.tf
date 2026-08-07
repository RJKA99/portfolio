locals {
  project  = "portfolio"
  location = "eastus2" # West Europe rejected new Static Web Apps on this subscription (403); East US 2 is a supported SWA region.
}

resource "azurerm_resource_group" "main" {
  name     = "rg-${local.project}"
  location = local.location
}

resource "azurerm_static_web_app" "main" {
  name                = "swa-${local.project}"
  resource_group_name = azurerm_resource_group.main.name
  location             = azurerm_resource_group.main.location
  sku_tier            = "Free"
  sku_size            = "Free"

  app_settings = {
    MONGODB_URI = var.mongodb_uri
  }

  lifecycle {
    # MONGODB_URI was set directly via `az staticwebapp appsettings set` (not through
    # this var, to avoid the secret ever touching a local tfvars/state diff review) —
    # don't let a plan with an empty var default clobber it back to blank.
    ignore_changes = [app_settings]
  }
}

# --- Custom domain: robinkarlsson.fi via Azure DNS ---
# Domainhotelli (the registrar) has no free DNS record editor without their hosting
# product, so the zone lives here instead — same pattern as pointing the domain at an
# external DNS host, just one we can manage with Terraform.

resource "azurerm_dns_zone" "main" {
  name                = "robinkarlsson.fi"
  resource_group_name = azurerm_resource_group.main.name
}

resource "azurerm_dns_txt_record" "domain_validation" {
  name                = "@"
  zone_name           = azurerm_dns_zone.main.name
  resource_group_name = azurerm_resource_group.main.name
  ttl                 = 3600

  record {
    value = "_cub1qubue072d08m5duxqwnrrjfkyqh" # SWA custom domain validation token, generated via `az staticwebapp hostname set --validation-method dns-txt-token`
  }
}

resource "azurerm_dns_a_record" "apex" {
  name                = "@"
  zone_name           = azurerm_dns_zone.main.name
  resource_group_name = azurerm_resource_group.main.name
  ttl                 = 3600
  target_resource_id  = azurerm_static_web_app.main.id
}

output "dns_name_servers" {
  value = azurerm_dns_zone.main.name_servers
}

variable "mongodb_uri" {
  description = "MongoDB connection string for the contact form API. Optional — if empty, the API still validates and rate-limits submissions but doesn't persist them (same fallback behavior the Vercel deployment already had)."
  type        = string
  default     = ""
  sensitive   = true
}

output "default_hostname" {
  value = azurerm_static_web_app.main.default_host_name
}

output "deployment_token" {
  value     = azurerm_static_web_app.main.api_key
  sensitive = true
}
