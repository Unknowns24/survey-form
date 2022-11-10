import React from "react";

const HomeComponent = () => {
	return (
		<>
			<div className="row">
				<div className="card mx-auto">
					<div className="card-body">
						<h1>Hola</h1>
						<p clsss="lead">Todavia no has creado ningun formulario</p>
						<a href="/survey/create" className="btn btn-success btn-block">
							Crea uno!
						</a>
					</div>
				</div>
			</div>
		</>
	);
};

export default HomeComponent;
