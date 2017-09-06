import React from 'react';
import { FormGroup, Button } from 'react-bootstrap';

import Header from '../layout/Header.jsx';
import ControlledForm from '../common/ControlledForm.jsx';
import { contactInfo } from '!json!../../sources/appVariables.json';
import Field from '../common/Field.jsx';
import * as utils from '../../utils/utils';

const Contacts = props => (
  <div>
    <Header
      backgroundUrl="http://res.cloudinary.com/dum4mjc9q/image/upload/v1487340139/fon3_dhhfll.jpg"
      title={props.translate('titleContacts')}
      subtitle={props.translate('subtitle')}
      big
    />
    <div className="container content">
      <div className="row">
        <div className="col-md-12">
          <div className="col-md-6">
            <h3>{props.translate('feedbackTitle')}</h3>
            <ControlledForm initialValues={getInitialValues()} onSubmit={props.actions.sendFeedback}>
              <FormGroup>
                <Field
                  id="userName"
                  type="text"
                  placeholder={props.translate('enterName')}
                  label={props.translate('name')}
                />
                <Field
                  id="email"
                  type="email"
                  placeholder={props.translate('enterEmail')}
                  label={props.translate('email')}
                  required
                />
                <Field
                  id="message"
                  componentClass="textarea"
                  placeholder={props.translate('enterMessage')}
                  label={props.translate('message')}
                  cols="30"
                  rows="10"
                  required
                />
              </FormGroup>
              <div className="form-group">
                <Button type="submit" bsStyle="primary">{props.translate('submit')}</Button>
              </div>
            </ControlledForm>
          </div>
          <div className="col-md-5 col-md-push-1 animate-box">
            <div className="contact-info">
              <h3>{props.translate('contactInfo')}</h3>
              <ul>
                <li><span className="glyphicon glyphicon-map-marker"/>{contactInfo.address}</li>
                <li><span className="glyphicon glyphicon-earphone"/><a href={`tel://${ contactInfo.phone }`}>{ contactInfo.phone }</a></li>
                <li><span className="glyphicon glyphicon-envelope"/><a href={`mailto:${ contactInfo.email }`}>{ contactInfo.email }</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

function getInitialValues() {
  const { name, email } = utils.getProfile().user_metadata;
  return { userName: name, email };
}

export default Contacts;