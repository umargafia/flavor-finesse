import { Linking } from 'react-native';
import Constants from 'expo-constants';
import * as Device from 'expo-device';

export default openEmailWithFeedback = () => {
  const deviceModel = Device.modelName;
  const osName = Device.osName;
  const osVersion = Device.osVersion;

  const appName = Constants.manifest.name;
  const appVersion = Constants.manifest.version; // Get the app version automatically

  const deviceInfo = `Device Info:\nDevice Model: ${deviceModel}\nOperating System: ${osName} ${osVersion}`;
  const subject = `Feedback for ${appName} (v${appVersion})`;

  // Construct the email body with pre-filled information
  const emailBody = `Feedback for ${appName} (v${appVersion}):\n\n${deviceInfo}\n\nWrite your feedback here:\n`;

  // URL encode the email body
  const recipientEmail = 'finesseflavor@gmail.com';
  const encodedEmailBody = encodeURIComponent(emailBody);

  // Create the mailto URL
  const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(
    subject
  )}&body=${encodedEmailBody}`;

  // Open the default email client with the pre-filled information
  Linking.openURL(mailtoUrl).catch((error) =>
    console.error('Failed to open email client: ', error)
  );
};
