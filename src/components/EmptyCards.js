import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

class EmptyCards extends React.Component {
	render() {
		return (
			<div className="col-lg-4 col-md-6 col-sm-1">
				<div>
					<div className="container px-1 px-md-4 py-5 mx-auto">
						<div>
							<div className="empty-card card">
								<div className="hide">
									<h5>
										Use the serach bar and the{" "}
										<FontAwesomeIcon
											icon={faPlusCircle}
											size="lg"
										/>{" "}
										icon to temporarily add a location here.
									</h5>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default EmptyCards;
