import { notify } from "node-notifier";
import { existsSync } from "fs";
import { join, dirname } from "path";
import { readHooksConfig } from "../configUtils";

async function postDeploymentHook(hookConfig) {
	const hooksConfig = await readHooksConfig();
	if (!hooksConfig.postDeploymentHook) {
		return;
	}
	const response = hookConfig.result.response;
	if (response.success) {
		dispatchSuccessfulNotification(response);
	} else {
		dispatchFailureNotification(response);
	}
}

function dispatchSuccessfulNotification(deploymentResult) {
	let message = `${deploymentResult.numberComponentsDeployed} component(s) deployed`;
	if (deploymentResult.numberTestsCompleted > 0) {
		message += `and ${deploymentResult.numberTestsCompleted} test(s) run successfully`;
	}
	notify({
		title: "Deployment successful",
		message,
		icon: getSuccessIcon(),
		appID: "SFDX",
		label: "SFDX",
		"app-name": "SFDX",
	});
}

function dispatchFailureNotification(deploymentResult) {
	let message = "Something went wrong";
	if (deploymentResult.numberComponentErrors > 0) {
		message = `${deploymentResult.numberComponentErrors} out of ${deploymentResult.numberComponentsTotal} components failed`;
	} else if (deploymentResult.numberTestErrors > 0) {
		message = `${deploymentResult.numberTestErrors} test(s) failed`;
	} else {
		let coverageWarnings =
			deploymentResult.details.runTestResult.codeCoverageWarnings ?? [];
		if (!Array.isArray(coverageWarnings)) {
			coverageWarnings = [coverageWarnings];
		}
		if (coverageWarnings.length > 0) {
			const formattedWarnings = coverageWarnings
				.map((warning) => `- ${warning.message}`)
				.join("\n");
			message =
				"Coverage requirements weren't fulfilled:\n" + formattedWarnings;
		}
	}
	notify({
		title: "Deployment failed",
		message,
		icon: getFailureIcon(),
		appID: "SFDX",
		label: "SFDX",
		"app-name": "SFDX",
	});
}

const NOTIFICATION_ICONS_FOLDER_NAME = "notification_icons";

function getSuccessIcon() {
	return join(
		getRootPackageName(),
		NOTIFICATION_ICONS_FOLDER_NAME,
		"deployment_success_icon.png"
	);
}

function getFailureIcon() {
	return join(
		getRootPackageName(),
		NOTIFICATION_ICONS_FOLDER_NAME,
		"deployment_failure_icon.png"
	);
}

function getRootPackageName(): string {
	let currentDir = __dirname;
	while (!existsSync(join(currentDir, "package.json"))) {
		console.log(currentDir);
		currentDir = dirname(currentDir);
	}
	return currentDir;
}

export default postDeploymentHook;
