import React from 'react';

class EmptyCards extends React.Component {
    render() {
        return (
			<div className='col-lg-4 col-md-6 col-sm-1 locationCards'>
				<div>
					<div className="container px-1 px-md-4 py-5 mx-auto">
						<div>
							<div className='empty-card card'>
								<div class="hide">Use the serach bar to add a location here.</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
}}

export default EmptyCards