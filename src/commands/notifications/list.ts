import { SfdxCommand } from "@salesforce/command";
import { Messages } from "@salesforce/core";
import { readConfig } from "../../configUtils";

Messages.importMessagesDirectory(__dirname);

const messages = Messages.loadMessages(
	"sfdx-notifications",
	"notifications_list"
);

export default class GenerateSObjectTypings extends SfdxCommand {
	public static description = messages.getMessage("description");

	public async run(): Promise<unknown> {
		const config = await readConfig();
		const configAsList = [];
		for (const commandName of Object.keys(config).sort()) {
			configAsList.push({
				...config[commandName],
				commandName,
			});
		}
		this.ux.table(configAsList, {
			columns: [
				{
					label: messages.getMessage("column_commandName"),
					key: "commandName",
				},
				{
					label: messages.getMessage("column_title"),
					key: "title",
				},
				{
					label: messages.getMessage("column_message"),
					key: "message",
				},
				{
					label: messages.getMessage("column_icon"),
					key: "icon",
				},
			],
		});
		return configAsList;
	}
}
