import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import FIELDS from './surveyFields';
import * as actions from '../../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {

    const formFields = FIELDS.map(field => {
        return(
            <div key={field.name}>
                <label>{field.label}</label>
                <div>{formValues[field.name]}</div>
            </div>
        )
    })

    return(
        <div>
            <h5>Please confirm your values</h5>
            {formFields}
            <button className="white-text yellow darken-3 btn" style={{marginTop: '10px'}} onClick={onCancel}>Back</button>
            <button className="white-text green btn right" onClick={() => submitSurvey(formValues, history)}>Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    );
}

function mapStateToProps(state){
    return{ formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));