import { handleCreateSurvey } from "hooks/useSurvey";
import React, { useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import { Toast, uuidv4 } from "utils/prompts";

const InitialState = {
	title: "",
	description: "",
	options: [],
	questions: [],
};

const CreateSurveyComponent = () => {
	const [state, setState] = useState(InitialState);
	const [showCreateOption, setShowCreateOption] = useState(false);
	const [newOption, setNewOption] = useState("");
	const [showCreateQuestion, setShowCreateQuestion] = useState(false);
	const [newQuestion, setNewQuestion] = useState("");
	const [newQuestionAnswers, setNewQuestionAnswers] = useState([]);
	const [newAnswer, setNewAnswer] = useState("");
	const [newAnswerOption, setNewAnswerOption] = useState("");
	const navigation = useNavigate();

	const toogleCreate = (e) => {
		var name = e.currentTarget.name;
		if (name === "option") {
			setShowCreateOption((prev) => !prev);
		} else {
			if (state.options.length < 1) {
				Toast.fire({
					icon: "error",
					text: "Debes crear al menos una opcion antes de crear las preguntas!",
				});
				return;
			}
			setShowCreateQuestion((prev) => !prev);
		}
	};

	const handleSelect = (e) => {
		var value = e.currentTarget.value;

		setNewAnswerOption(value);
	};

	const cancelCreate = (e) => {
		var name = e.currentTarget.name;
		if (name === "option") {
			setNewOption("");
			setShowCreateOption(false);
		} else {
			setNewQuestion("");
			setShowCreateQuestion(false);
		}
	};

	const confirmCreate = (e) => {
		var name = e.currentTarget.name;
		if (name === "option") {
			if (newOption === "") {
				Toast.fire({
					icon: "error",
					text: "Completa los datos de la opcion",
				});
				return;
			}
			setNewOption("");
			setShowCreateOption(false);
			setState((prev) => ({ ...prev, options: [...state.options, { value: uuidv4(), label: newOption }] }));
		} else {
			if (newQuestion === "" || newQuestionAnswers.length < 1) {
				Toast.fire({
					icon: "error",
					text: "Completa los datos de la pregunta",
				});
				return;
			}

			setNewQuestion("");
			setNewQuestionAnswers([]);
			setShowCreateQuestion(false);
			setState((prev) => ({ ...prev, questions: [...state.questions, { value: uuidv4(), text: newQuestion, answers: newQuestionAnswers }] }));
		}
	};

	const deleteOption = (e) => {
		var optionId = e.currentTarget.id;

		setState((prev) => ({
			...prev,
			options: state.options.filter(function (opt) {
				return opt.value !== optionId;
			}),
		}));
	};

	const addAnswer = (e) => {
		if (newAnswer === "" || newAnswerOption === "") {
			Toast.fire({
				icon: "error",
				text: "Completa los datos de la respuesta que quieres añadir",
			});
			return;
		}

		setNewQuestionAnswers(() => [...newQuestionAnswers, { key: uuidv4(), value: newAnswer, inclination: newAnswerOption }]);
		setNewAnswer("");
		setNewAnswerOption("");
	};

	const deleteAnswer = (e) => {
		var answerId = e.currentTarget.id;

		setNewQuestionAnswers(
			newQuestionAnswers.filter(function (ans) {
				return ans.key !== answerId;
			})
		);
	};

	const handleInput = (e) => {
		var inputName = e.currentTarget.name;
		var value = e.currentTarget.value;

		setState((prev) => ({ ...prev, [inputName]: value }));
	};

	const handleCreateInput = (e) => {
		var inputName = e.currentTarget.name;
		var value = e.currentTarget.value;

		if (inputName === "optionValue") {
			setNewOption(value);
		} else if (inputName === "questionValue") setNewQuestion(value);
		else {
			setNewAnswer(value);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (state.title === "" || state.description === "") {
			Toast.fire({
				icon: "error",
				text: "Completa los datos basicos de la encuesta!",
			});
			return;
		}

		if (state.questions < 1) {
			if (state.title === "" || state.description === "") {
				Toast.fire({
					icon: "error",
					text: "La encuesta debe tener al menos una pregunta!",
				});
				return;
			}
		}

		await handleCreateSurvey(state, navigation);
	};

	return (
		<div className="col-12 mx-auto">
			<div className="card">
				<div className="card-header bg-light text-center">
					<h3 className="text-black">Nueva encuesta</h3>
				</div>
				<div className="card-body text-right">
					<form action="/survey/create" method="POST">
						<div className="mb-3">
							<label htmlFor="title">Titulo:</label>
							<input type="text" name="title" className="form-control" placeholder="Titulo" autoFocus value={state.title} onChange={handleInput} />
						</div>
						<div className="mb-3">
							<label htmlFor="description">Descripción:</label>
							<textarea name="description" className="form-control" placeholder="Descripción" value={state.description} onChange={handleInput}></textarea>
						</div>
						<div className="mb-3">
							<div className="table-title">
								<label htmlFor="posibilities">Opciones:</label>
							</div>
							<table name="posibilities" className="table table-bordered">
								<thead>
									<tr>
										<th className="col-11">Titulo</th>
										<th className="col-1">Acciones</th>
									</tr>
								</thead>
								<tbody>
									{state.options.map((option, key) => {
										return (
											<tr key={key}>
												<td>{option.label}</td>
												<td className="text-center">
													<a id={option.value} name="option" className="mt-2" title="Cancel" data-toggle="tooltip" onClick={deleteOption}>
														<i className="fa fa-trash text-danger"></i>
													</a>
												</td>
											</tr>
										);
									})}

									{showCreateOption ? (
										<tr>
											<td>
												<input type="text" name="optionValue" className="form-control" placeholder="Titulo de la nueva opcion" value={newOption} onChange={handleCreateInput} />
											</td>
											<td>
												<div className="container">
													<div className="d-flex justify-content-between  text-center">
														<a name="option" className="mt-2" title="Create" data-toggle="tooltip" onClick={confirmCreate}>
															<i className="fa fa-check text-success"></i>
														</a>
														<a name="option" className="mt-2" title="Cancel" data-toggle="tooltip" onClick={cancelCreate}>
															<i className="fa fa-times text-danger"></i>
														</a>
													</div>
												</div>
											</td>
										</tr>
									) : (
										""
									)}
								</tbody>
							</table>
						</div>
						<div className="d-flex justify-content-center text-center mb-3">
							<button id="add-new" type="button" className="btn btn-outline-success add-new rounded-pill col-md-12" name="option" onClick={toogleCreate}>
								<i className="fa fa-plus"></i> Añadir opcion
							</button>
						</div>

						<div className="mb-3">
							<div className="table-title">
								<label htmlFor="posibilities">Preguntas:</label>
							</div>
							<table name="posibilities" className="table table-bordered">
								<thead>
									<tr>
										<th className="col-11">Pregunta</th>
										<th className="col-1">Acciones</th>
									</tr>
								</thead>
								<tbody>
									{state.questions.map((question, key) => {
										return (
											<tr key={key}>
												<td>{question.text}</td>
												<td className="text-center">
													<a id={question.value} name="question" className="mt-2" title="Cancel" data-toggle="tooltip" onClick={cancelCreate}>
														<i className="fa fa-times text-danger"></i>
													</a>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
							<div className="modal" style={{ display: `${showCreateQuestion ? "block" : "none"}` }}>
								<div className="modal-dialog" role="document">
									<div className="modal-content">
										<div className="modal-header">
											<h5 className="modal-title">Añadir pregunta</h5>
											<button type="button" className="btn-close" onClick={toogleCreate} name="question" aria-label="Close">
												<span aria-hidden="true"></span>
											</button>
										</div>
										<div className="modal-body">
											<h6>Pregunta</h6>
											<div className="mb-3">
												<input type="text" name="questionValue" className="form-control mt-1" placeholder="Pregunta" autoFocus value={newQuestion} onChange={handleCreateInput} />
											</div>
											<hr />
											<h6>Crear Respuesta</h6>
											<div className="mb-3">
												<div className="mb-3">
													<input type="text" name="questionAnswer" className="form-control mt-1" placeholder="Encabezado" autoFocus value={newAnswer} onChange={handleCreateInput} />
												</div>
												<div className="mb-3">
													<label htmlFor="questionAnswer">Inclinacion de la respuesta:</label>
													<select className="form-select" name="questionOption" value={newAnswerOption} onChange={handleSelect}>
														<option disabled value="">
															Selecciona una opcion
														</option>

														{state.options.map((option, key) => {
															return (
																<option value={option.value} key={key}>
																	{option.label}
																</option>
															);
														})}
													</select>
												</div>
												<div className="d-flex justify-content-center">
													<button type="button" className="btn rounded-pill btn-outline-info btn-sm" onClick={addAnswer}>
														agregar
													</button>
												</div>
											</div>

											<hr />
											<h6>Respuestas</h6>

											<ul className="list-group">
												{newQuestionAnswers.map((ans, key) => {
													return (
														<li key={key} className="list-group-item d-flex justify-content-between align-items-center">
															{ans.value}
															<a id={ans.key} className="mt-2" title="Cancel" data-toggle="tooltip" onClick={deleteAnswer}>
																<i className="fa fa-trash text-danger"></i>
															</a>
														</li>
													);
												})}
											</ul>
										</div>
										<div className="modal-footer">
											<button name="question" type="button" className="btn btn-success" onClick={confirmCreate}>
												Guardar
											</button>
											<button onClick={toogleCreate} name="question" type="button" className="btn btn-outline-dark">
												Cerrar
											</button>
										</div>
									</div>
								</div>
							</div>
							<div className="d-flex justify-content-center text-center mb-3">
								<button id="add-new" type="button" className="btn btn-outline-warning add-new rounded-pill col-md-12" name="question" onClick={toogleCreate}>
									<i className="fa fa-plus"></i> Añadir Pregunta
								</button>
							</div>
						</div>
						<div className="mb-3"></div>
						<button className="btn btn-primary w-100" type="button" onClick={handleSubmit}>
							Crear
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default CreateSurveyComponent;
