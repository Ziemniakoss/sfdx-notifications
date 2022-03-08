import { SfdxCommand } from "@salesforce/command";
import { Messages } from "@salesforce/core";
import { readConfig, writeConfig } from "../../configUtils";

Messages.importMessagesDirectory(__dirname);

const messages = Messages.loadMessages(
	"sfdx-notifications",
	"notifications_register"
);

const defaultValues = Messages.loadMessages(
	"sfdx-notifications",
	"default_values"
);

export default class GenerateSObjectTypings extends SfdxCommand {
	public static description = messages.getMessage("description");

	public async run(): Promise<unknown> {
		const commandName = await this.ux.prompt(
			messages.getMessage("prompt_commandName"),
			{ required: true }
		);
		const title = await this.ux.prompt(messages.getMessage("prompt_title"), {
			default: defaultValues.getMessage("default_title"),
		});
		const message = await this.ux.prompt(
			messages.getMessage("prompt_message"),
			{
				default: defaultValues.getMessage("default_message"),
			}
		);
		const icon = await this.ux.prompt(messages.getMessage("prompt_icon"), {
			required: false,
		});

		const notificationsConfig = await readConfig(this.config.configDir);
		notificationsConfig[commandName] = {
			title,
			message,
			icon,
		};
		return writeConfig(this.config.configDir, notificationsConfig);
	}
}
