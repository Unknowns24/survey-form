import { createSurvey } from "services/surveyService";
import { Toast } from "utils/prompts";
import codes from "config/codes.json";

export const handleCreateSurvey = async ({ title, description, options, questions }) => {
	const res = await createSurvey({ title, description, options, questions }).catch(() => {
		Toast.fire({
			icon: "error",
			title: "Ocurrio un error al intentar crear la encuesta",
		});
		return;
	});

	if (res.data.message !== undefined) {
		let defaultMessage = res.data.message.includes("SUCN") ? "Encuesta creada con exito!" : "Ocurrio un error al intentar crear la encuesta";

		Toast.fire({
			icon: res.data.message.includes("SUCN") ? "success" : "error",
			title: codes[res.data.message] ?? defaultMessage,
		});
	}
};
