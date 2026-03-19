export const environment = {
  production: true,
  // Tokens substituídos pelo Dockerfile via ARG (--build-arg) antes do ng build
  whatsappBotNumber: '__WHATSAPP_BOT_NUMBER__',
  whatsappSupportNumber: '__WHATSAPP_SUPPORT_NUMBER__',
};
