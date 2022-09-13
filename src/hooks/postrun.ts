import { Messages } from "@salesforce/core";
Messages.importMessagesDirectory(__dirname);

import { notify } from "node-notifier";
import { readConfig } from "../configUtils";

const messages = Messages.loadMessages("sfdx-notifications", "default_values");

async function hook(options) {
	const commandName = options.Command.id;
	const config = await readConfig();
	const commandNotificationConfig = config[commandName];
	if (commandNotificationConfig == null) {
		return;
	}
	const placeholderValues = {
		commandName,
	};
	const title = fillPlaceholders(
		commandNotificationConfig.title ?? messages.getMessage("default_title"),
		placeholderValues
	);
	const message = fillPlaceholders(
		commandNotificationConfig.message ?? messages.getMessage("default_message"),
		placeholderValues
	);
	const icon = commandNotificationConfig.icon;
	const notification = {
		title,
		message,
		icon,
		appID: "SFDX",
		label: "SFDX",
		"app-name": "SFDX",
	};
	notify(notification);
}

function fillPlaceholders(
	text: string,
	placeholderValues: { commandName: string }
): string {
	return text.replace("{{commandName}}", placeholderValues.commandName);
}

export default hook;
