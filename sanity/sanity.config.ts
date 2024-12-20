import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { dashboardTool, projectInfoWidget, projectUsersWidget } from "@sanity/dashboard";
import { vercelWidget } from "sanity-plugin-dashboard-widget-vercel";
import { visionTool } from "@sanity/vision";
import { codeInput } from "@sanity/code-input";
import { colorInput } from "@sanity/color-input"; // Import the color input plugin
import { simplerColorInput } from "sanity-plugin-simpler-color-input";
import { locations } from "./src/presentation";
import { BASE_URL, projectId, dataset } from "./src/env";
import { sanitypressGuideWidget } from "./src/sanitypressGuideWidget";
import structure from "./src/structure";
import { schemaTypes } from "./schemas";

const singletonTypes = ["site"];

export default defineConfig({
	name: "default",
	title: "SanityPress",

	projectId,
	dataset,
	basePath: "/admin",

	plugins: [
		structureTool({
			name: "content",
			title: "Content",
			structure,
		}),
		presentationTool({
			name: "editor",
			title: "Editor",
			previewUrl: {
				draftMode: {
					enable: `${BASE_URL}/api/draft`,
				},
			},
			resolve: { locations },
		}),
		dashboardTool({
			name: "deployment",
			title: "Deployment",
			widgets: [vercelWidget()],
		}),
		dashboardTool({
			name: "info",
			title: "Info",
			widgets: [projectInfoWidget(), projectUsersWidget(), sanitypressGuideWidget()],
		}),
		visionTool(),
		codeInput(),
		colorInput(),
		simplerColorInput({
			// Note: These are all optional
			defaultColorFormat: "hex",
			enableSearch: true,
		}),
	],

	tasks: { enabled: false },
	scheduledPublishing: { enabled: false },

	schema: {
		types: schemaTypes,
		templates: (templates) =>
			templates.filter(({ schemaType }) => !singletonTypes.includes(schemaType)),
	},

	document: {
		actions: (input, { schemaType }) =>
			singletonTypes.includes(schemaType)
				? input.filter(
						({ action }) => action && ["publish", "discardChanges", "restore"].includes(action),
					)
				: input,
	},
});
