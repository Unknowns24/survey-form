import { surveySelector } from "context/surveySlice";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const HomeComponent = () => {
	const { surveyList } = useSelector(surveySelector);
	const [haveSurvey, setHaveSurvey] = useState(false);

	useEffect(() => {
		if (surveyList !== null && surveyList !== undefined) {
			if (surveyList.length > 0) {
				setHaveSurvey(true);
			}
		}
	}, [surveyList]);

	return (
		<>
			<div className="row">
				{!haveSurvey ? (
					<div className="card mx-auto">
						<div className="card-body">
							<h1>Hola</h1>
							<p clsss="lead">Todavia no has creado ningun formulario</p>
							<a href="/survey/create" className="btn btn-success btn-block">
								Crea uno!
							</a>
						</div>
					</div>
				) : (
					surveyList.map((survey, key) => {
						return (
							<div className="col-md-3" key={key}>
								<div className="card">
									<div className="card-body">
										<h4 className="card-title d-flex justify-content-between align-items-center">{survey.title}</h4>
										<p>{survey.description} </p>
										<form>
											<button type="button" className="btn btn-danger btn-block btn-sm">
												Cerrar
											</button>

											<button type="button" className="btn btn-success btn-block btn-sm">
												Ver respuestas
											</button>
										</form>
									</div>
								</div>
							</div>
						);
					})
				)}
			</div>
		</>
	);
};

export default HomeComponent;
