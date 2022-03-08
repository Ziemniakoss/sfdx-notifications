import { SfdxCommand } from "@salesforce/command";
import { Messages } from "@salesforce/core";
import { readConfig, writeConfig } from "../../configUtils";

Messages.importMessagesDirectory(__dirname);

const messages = Messages.loadMessages(
	"sfdx-notifications",
	"notifications_unregister"
);

export default class GenerateSObjectTypings extends SfdxCommand {
	public static description = messages.getMessage("description");

	public async run(): Promise<unknown> {
		const commandName = await this.ux.prompt(
			messages.getMessage("prompt_commandName")
		);
		const config = await readConfig(this.config.configDir);
		config[commandName] = undefined;
		return writeConfig(this.config.configDir, config);
	}
}
