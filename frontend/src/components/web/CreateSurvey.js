import React, { useState } from "react";
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
	const [newQuestionOption, setNewQuestionOption] = useState("");

	const toogleCreate = (e) => {
		var name = e.currentTarget.name;
		if (name === "option") {
			setShowCreateOption((prev) => !prev);
		} else {
			setShowCreateQuestion((prev) => !prev);
		}
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
			if (newQuestion === "" || newQuestionOption === "") {
				Toast.fire({
					icon: "error",
					text: "Completa los datos de la pregunta",
				});
				return;
			}

			setNewQuestion("");
			setShowCreateQuestion(false);
			setState((prev) => ({ ...prev, questions: [...state.questions, { value: uuidv4(), text: newQuestion, option: newQuestionOption }] }));
		}
	};

	const handleSelect = (e) => {
		var value = e.currentTarget.value;

		setNewQuestionOption({ value: value, label: e.currentTarget.text() });
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
		} else {
			setNewQuestion(value);
		}
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
													<a id={option.value} name="option" className="mt-2" title="Cancel" data-toggle="tooltip" onClick={cancelCreate}>
														<i className="fa fa-times text-danger"></i>
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
										<th className="col-6">Pretunta</th>
										<th className="col-5">Inclinacion</th>
										<th className="col-1">Acciones</th>
									</tr>
								</thead>
								<tbody>
									{state.questions.map((question, key) => {
										console.log(question);
										return (
											<tr key={key}>
												<td>{question.text}</td>
												<td>{question.option.label}</td>
												<td className="text-center">
													<a id={question.value} name="question" className="mt-2" title="Cancel" data-toggle="tooltip" onClick={cancelCreate}>
														<i className="fa fa-times text-danger"></i>
													</a>
												</td>
											</tr>
										);
									})}

									{showCreateQuestion ? (
										<tr>
											<td>
												<input type="text" name="questionValue" className="form-control" placeholder="Nueva Pregunta" value={newQuestion} onChange={handleCreateInput} />
											</td>
											<td>
												<select className="form-select" name="questionOption" value={newQuestionOption} onChange={handleSelect}>
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
											</td>
											<td>
												<div className="container">
													<div className="d-flex justify-content-between  text-center">
														<a className="mt-2" name="question" title="Create" data-toggle="tooltip" onClick={confirmCreate}>
															<i className="fa fa-check text-success"></i>
														</a>
														<a className="mt-2" name="question" title="Cancel" data-toggle="tooltip" onClick={cancelCreate}>
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
							<div className="d-flex justify-content-center text-center mb-3">
								<button id="add-new" type="button" className="btn btn-outline-warning add-new rounded-pill col-md-12" name="question" onClick={toogleCreate}>
									<i className="fa fa-plus"></i> Añadir Pregunta
								</button>
							</div>
						</div>
						<div className="mb-3"></div>
						<button className="btn btn-primary w-100" type="submit">
							Crear
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default CreateSurveyComponent;
