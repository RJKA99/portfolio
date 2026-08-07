locals {
  project  = "portfolio"
  location = "westeurope" # Static Web Apps free tier isn't available in all regions; West Europe is.
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
