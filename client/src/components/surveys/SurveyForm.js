import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import FIELDS from './surveyFields';

class SurveyForm extends Component{

    renderFields(){
        return FIELDS.map(({label, name}) => {
            return (
                <Field key={name} component={SurveyField} type="text" label={label} name={name} />
            );
        });
    }

    render(){
        return(
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to="/surveys" className="btn red white-text">Cancel</Link>
                    <button type="submit" className="blue btn right white-text">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values){
    const errors = {};

    errors.recipients = validateEmails(values.recipients || '');
    
    for(let obj of FIELDS){
        if(!values[obj.name]){
            errors[obj.name] = `Please enter a valid ${obj.label}`;
        }
    }

    return errors;
}

export default reduxForm({
    validate ,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);