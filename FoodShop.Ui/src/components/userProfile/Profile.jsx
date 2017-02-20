import React, { Component } from 'react';
import Header from '../layout/Header.jsx';
import ViewProfile from './ViewProfile.jsx';
import EditProfile from './EditProfile.jsx';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewMode: 0,
      profile: props.auth.getProfile()
    };
    // this.updateProfile = this.updateProfile.bind(this);
  }
  // updateProfile() {
  //   const { auth } = this.props;
  //   const { profile } = this.state;
  //   const data = {
  //     user_metadata: {
  //       someData: 'from profile с кириллицей 5'
  //     }
  //   };
  //   auth.updateProfile(profile.user_id, data, profile =>
  //     this.setState({ profile })
  //   );
  // }
  goToViewMode() {
    this.setState({ viewMode: 0 });
  }
  goToEditMode() {
    this.setState({ viewMode: 1 });
  }
  render() {
    const { viewMode, profile } = this.state;
    const { getSubstitutions } = this.props.actions;
    const profileProps = {
      goToViewMode: this.goToViewMode,
      goToEditMode: this.goToEditMode,
      getSubstitutions,
      profile
    };
    return (
      <span>
        <Header
          backgroundUrl="http://res.cloudinary.com/dum4mjc9q/image/upload/v1487340138/fon1_gex8nh.jpg"
          className="cut"
        />
        {viewMode === 0
          ? <ViewProfile {...profileProps} />
          : <EditProfile {...profileProps} />
        }
      </span>
    );
  }
}

export default Profile;