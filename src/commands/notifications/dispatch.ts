import { SfdxCommand } from "@salesforce/command";
import { Messages } from "@salesforce/core";

Messages.importMessagesDirectory(__dirname);

const messages = Messages.loadMessages(
	"sfdx-notifications",
	"notifications_dispatch"
);

export default class GenerateSObjectTypings extends SfdxCommand {
	public static description = messages.getMessage("description");

	public async run(): Promise<unknown> {
		this.ux.log(messages.getMessage("console_message"));
		const notification = {
			title: messages.getMessage("title"),
			message: messages.getMessage("message"),
			appID: "SFDX",
			label: "SFDX",
			"app-name": "SFDX"
		};
		return this.config.runHook("notification", { notification })
			.catch(error => this.ux.error(`Error occurred while dispatching notification ${error}`))
			.finally(() => notification);
	}
}
