import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import SelectListGroup from '../common/SelectListGroup'
import InputGroup from '../common/InputGroup'


class CreateProfile extends Component {
  constructor(props){
    super()
    this.state = {
      displaySocialInputs : false,
      handle : '' , 
      company : '' , 
      website : '',
      location : '',
      status : '',
      skills : '',
      githubusername : '',
      bio : '',
      twitter : '',
      facebook : '',
      linkedin : '',
      youtube : '',
      instagram : '',
      errors : {}
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)

  }

  onSubmit(e){
    e.preventDefault()
    console.log('SUBMIT')
  }

  onChange(e){
    e.preventDefault()
    this.setState({[e.target.name]: e.target.value})
  }


  render() {
    const {errors,displaySocialInputs} = this.state

    let inputSocial

    if(displaySocialInputs){
      inputSocial = (
        <div>
          <InputGroup
          placeholder="Twitter Profile URL"
          name="twitter"
          icon="fab fa-twitter"
          value={this.state.twitter} 
          onChange={this.onChange}
          error={errors.twitter}
          />  
          <InputGroup
          placeholder="Facebook Profile URL"
          name="facebook"
          icon="fab fa-facebook"
          value={this.state.facebook} 
          onChange={this.onChange}
          error={errors.facebook}
          />  
          <InputGroup
          placeholder="Linkedin Profile URL"
          name="linkedin"
          icon="fab fa-linkedin"
          value={this.state.linkedin} 
          onChange={this.onChange}
          error={errors.linkedin}
          />  
          <InputGroup
          placeholder="Youtube Profile URL"
          name="youtube"
          icon="fab fa-youtube"
          value={this.state.youtube} 
          onChange={this.onChange}
          error={errors.youtube}
          />  
          <InputGroup
          placeholder="Instagram Profile URL"
          name="instagram"
          icon="fab fa-instagram"
          value={this.state.instagram} 
          onChange={this.onChange}
          error={errors.instagram}
          />  
        </div>
      )
    }

    //select options for status 
    const options = [
      {label : '* Select Professional Status', value : 0},
      {label : 'Developer', value : 'Developer'},
      {label : 'Junior Developer', value : 'Junior Developer'},
      {label : 'Senior Developer', value : 'Senior Developer'},
      {label : 'Manager', value : 'Manager'},
      {label : 'Student or Learning', value : 'Student or Learning'},
      {label : 'Instructor or Teacher', value : 'Instructor or Teacher'},
      {label : 'Intern', value : 'Intern'},
      {label : 'Other', value : 'Other'},
      
    ]


    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">
                Create your Profile
              </h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = requied fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                placeholder="* Profile Handle"
                name="handle"
                value={this.state.handle}
                onChange={this.onChange}
                error={errors.handle}
                info="A unique handle for your profile URL. Your fullname, comapanyname, nickname"
                />
                <SelectListGroup
                placeholder="Status"
                name="status"
                value={this.state.status}
                onChange={this.onChange}
                error={errors.status}
                options={options}
                info="Give us an idea of where you are at in your carear"
                />
                <TextFieldGroup
                placeholder="Company"
                name="company"
                value={this.state.company}
                onChange={this.onChange}
                error={errors.company}
                info="Could be your own company or one you work for"
                />
                <TextFieldGroup
                placeholder="Website"
                name="website"
                value={this.state.website}
                onChange={this.onChange}
                error={errors.website}
                info="Could be your own website or one you work for"
                />
                <TextFieldGroup
                placeholder="Website"
                name="website"
                value={this.state.website}
                onChange={this.onChange}
                error={errors.website}
                info="Could be your own website or one you work for"
                />
                <TextFieldGroup
                placeholder="Location"
                name="location"
                value={this.state.location}
                onChange={this.onChange}
                error={errors.location}
                info="City and state (Mumbai, Maharastra)"
                />
                <TextFieldGroup
                placeholder="* Skills"
                name="skills"
                value={this.state.skills}
                onChange={this.onChange}
                error={errors.skills}
                info="Please use comma separated values (eg. HTML,CSS,javascript,Android)"
                />
                <TextFieldGroup
                placeholder="Githun Username"
                name="githubusername"
                value={this.state.githubusername}
                onChange={this.onChange}
                error={errors.githubusername}
                info="If you want your latest respos and github link, include your username"
                />
                <TextAreaFieldGroup
                placeholder="Short bio"
                name="bio"
                value={this.state.bio}
                onChange={this.onChange}
                error={errors.bio}
                info="Tell us a little about yourself"
                />
                <div className="mb-3">
                  <button onClick={()=> {
                    this.setState(prevState => ({
                      displaySocialInputs : !prevState.displaySocialInputs
                    }))
                  }} className="btn btn-light">
                  Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {inputSocial}
                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  profile : state.profile,
  errors : state.errors
})

CreateProfile.propTypes = {
  profile : PropTypes.object.isRequired,
  errors : PropTypes.object.isRequired
}

export default connect(mapStateToProps)(CreateProfile)
