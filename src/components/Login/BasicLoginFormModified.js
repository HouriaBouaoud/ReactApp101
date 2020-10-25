import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Grid } from "@material-ui/core";
import {AccountCircleIcon,VpnKeyIcon} from '@material-ui/icons/AccountCircle';

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import validateInput from "../../validation/LoginValidation";
import validator from 'validator';

import {connect} from 'react-redux'  ;
import {login} from '../../Actions/login';







class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      message: "",
      open: false,
      errors:{},
      isLoading: false,
     
    };
    /*this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);*/
  }
  /*
  IsValide(){
    const { errors,isValid} = validateInput(this.state);
    if(!isValid){
      this.setState({errors});
    }
    return this.isValid
  }
*/
/*
  onSubmit(e){
    e.preventDefault();
    if(this.IsValide()){

    }
  }
  */
  /*
  onChange(e){
    this.setState({ [e.target.name] : e.target.value });
  }*/

  setPassword = event => {
    this.setState({
      password: event.target.value
    });
  };

  setEmail = event => {
    this.setState({
      email: event.target.value
    });
  };
  

  signIn = () => { 
    if(validator.isEmpty(this.state.email) ||validator.isEmpty(this.state.password) ){
     // errors.email = 'this field is required !';
      this.setState({
        open: true,
        message: "Email & password fields are required "
      });
  }else if (!validator.isEmail(this.state.email)) {
      //errors.email = 'Invalid Email';
      this.setState({
        open: true,
        message: "Invalid Email "
      });
    }

  else if (!validator.isLength(this.state.password, { min: 8 })) {
      //errors.password = 'Password should be minimum 8 characters';
      this.setState({
        open: true,
        message: "Invalid Password "
      });
    }    
      else{
        this.setState({
          open: true,
          message: "You have successfully Logged In!"
        });

        this.setState({errors:{}, isLoading: true});
        this.props.login(this.state).then(
            (res) => //this.props.history.push("/dashboard"),
            this.context.router.push('/dashboard'), 
             //browserHistory.push('/dashboard') ,
             <redirect to ='/dashboard' />,
            (err) => this.setState({errors: err.data.error,isLoading: false})
        );
        
        
      }




   /* if (this.isValid && this.state.email === "Houria@gmail.com" && this.state.password === "password") {
      this.setState({
        open: true,
        message: "You have successfully Logged In!"
      });
    } else {
      this.setState({
        open: true,
        message: "Incorrect email or Password!"
      });
    }*/
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const {errors,email,password,isLoading} = this.state;

    return (
      <form onSubmit={this.SignIn}>
      <div >
        <Grid container style = {{minHeight:'100vh'}}>
          <Grid item xs={12} sm={6}>
            <img src ="https://source.unsplash.com/random" style={{width:'100%', high:'100%',objectFit:'cover'}} alt="brand" />

          </Grid>
          <Grid container item xs={12} sm={6} alignItems="center" direction="column" style={{padding:10}}>
            <div />

            <div style={{display:'flex' , flexDirection:'column', maxWidth: 600 , minWidth:500}}>
              <Grid container justify="center">
              <img src="https://brandslogos.com/wp-content/uploads/images/large/aiesec-logo.png" alt="logo " width ={300}/>

              </Grid>
              
              <TextField 
                variant="outlined"
                label="email" 
                margin ="normal" 
                type = "email"
                value={this.state.username}
                //error={errors.email}
               // onChange={this.onChange}
               onChange={this.setEmail}

                
                inputProps={{startAdornment:(<InputAdornment position="start"><AccountCircleIcon/></InputAdornment>),}}
              />

              <TextField
                variant="outlined"
                label="password"
                margin ="normal"
                type ="password"
                value={this.state.password}
                error={errors.password}
                //onChange={this.onChange}
                onChange={this.setPassword}

                
                inputProps={{startAdornment:(<InputAdornment position="start"><VpnKeyIcon/></InputAdornment>),}}

              />
              <div style={{ height:40 , display:"flex"}}/>
              <Button
                variant="contained"
                onClick={() => {
                  this.signIn();
                }}
                >
                Login
              </Button>
              <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description">
            
              <DialogTitle id="alert-dialog-title">Sign In</DialogTitle>
              <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {this.state.message}
              </DialogContentText>
              </DialogContent>
              <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Okay
              </Button>
              </DialogActions>
              </Dialog>


              <Button>
                Interested in joining ?
              </Button>
            </div>
                  <div style={{height: 60}}/>
            <Grid container justify="center">
              <Grid item>
                  <Button>Go To Community page </Button>
              </Grid>
            </Grid>

            <div />
          </Grid>


        </Grid>
        

      </div>
     </form>
    );
  }
  
}

LoginForm.contextTypes = {
  router: React.propTypes.object.isRequired
}

LoginForm.propTypes = {
  login: React.propTypes.func.isRequired
}

export default connect(null,{login})(LoginForm);
//export default LoginForm;