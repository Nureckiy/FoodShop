/*eslint no-unused-vars: "off"*/
import React from 'react';
import { Form, Panel, Button } from 'react-bootstrap';

import RoomTileControl from '../booking/RoomTileControl.jsx';
import ControlledModal from '../common/ControlledModal.jsx';
import DateRangePicker from '../common/DateRangePicker.jsx';
import CreateRoomForm from '../admin/CreateRoomForm.jsx';

class RoomTileWithEditControl extends RoomTileControl {
  openEditModal() {
    this.refs.editRoomModal.toggle();
  }
  render() {
    const { className, room, room: { error }, onEdit, loadCategories, categories } = this.props;
    return (
      <span>
        <Form className={className} onSubmit={this.handleSubmit}>
          <Button type="button" className="btn btn-success col-sm-12" onClick={this.openEditModal.bind(this)}>Редактировать</Button>
          <Button type="submit" className="btn btn-success col-sm-12">Добавить</Button>
          <DateRangePicker onChange={this.handleDateChange} />
          <Panel className="col-sm-12 error-message" collapsible expanded={!!error}>
            {error && <p>{ error.message }</p>}
          </Panel>
        </Form>
        <ControlledModal
          ref="editRoomModal"
          title="Редактировать"
          closeOnSubmit >
            <CreateRoomForm
              formId="editRoomForm"
              onSubmit={onEdit}
              initial={room}
              loadCategories={loadCategories}
              categories={categories} />
        </ControlledModal>
      </span>
    );
  }
}

export default RoomTileWithEditControl;