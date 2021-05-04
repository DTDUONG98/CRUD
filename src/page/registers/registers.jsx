import React from 'react';

export default function Register(props) {
        return (
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
              </Typography>
                <form className={classes.form} noValidate>
                  <Grid container spacing={2}>
                  <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="Name"
                        label="Name"
                        name="name"
                        autoComplete="Name"
                        value={name}
                        onChange={(e) => this.setState({
                          name: e.currentTarget.value,
                          erName: undefined,
                          messName: '',
                      })}
                        error={this.state.erName}
                        helperText={this.state.messName}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="fname"
                        name="UserName"
                        variant="outlined"
                        required
                        fullWidth
                        id="UserName"
                        label="User Name"
                        autoFocus
                        value={username}
                        onChange={(e) => this.setState({
                          username: e.currentTarget.value,
                          erUserName: undefined,
                          messUserName: '',
                      })}
                        error={this.state.erUserName}
                        helperText={this.state.messUserName}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="Role"
                        label="Role"
                        name="Role"
                        autoComplete="Role"
                        value={role}
                        onChange={(e) => this.setState({
                          role: e.currentTarget.value,
                          erRole: undefined,
                          messRole: '',
                      })}
                        error={this.state.erRole}
                        helperText={this.state.messRole}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="BranchId"
                        label="BranchId"
                        name="email"
                        autoComplete="BranchId"
                        value={branchId}
                        onChange={(e) => this.setState({
                          branchId: e.currentTarget.value,
                          erBranchId: undefined,
                          messbranchId: '',
                      })}
                        error={this.state.erBranchId}
                        helperText={this.state.messbranchId}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="Phone"
                        label="Phone"
                        name="phone"
                        autoComplete="Phone"
                        value={phone}
                        onChange={(e) => this.setState({
                          phone: e.currentTarget.value,
                          erPhone: undefined,
                          messPhone: '',
                      })}
                        error={this.state.erPhone}
                        helperText={this.state.messPhone}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="Email"
                        label="Email"
                        name="email"
                        autoComplete="Email"
                        value={email}
                        onChange={(e) => this.setState({
                          email: e.currentTarget.value,
                          erEmail: undefined,
                          messEmail: '',
                      })}
                        error={this.state.erEmail}
                        helperText={this.state.messEmail}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="Position"
                        label="Position"
                        name="position"
                        autoComplete="Position"
                        value={position}
                        onChange={(e) => this.setState({
                          position: e.currentTarget.value,
                          erPosition: undefined,
                          messPosition: '',
                      })}
                        error={this.state.erPosition}
                        helperText={this.state.messPosition}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="birthDate"
                        label="birthDate"
                        name="birthDate"
                        autoComplete="birthDate"
                        value={birthDate}
                        onChange={(e) => this.setState({
                          birthDate: e.currentTarget.value,
                          erBirthDate: undefined,
                          messBirthDate: '',
                      })}
                        error={this.state.erBirthDate}
                        helperText={this.state.messBirthDate}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => this.setState({
                          password: e.currentTarget.value,
                          erPass: undefined,
                          messPass: '',
                      })}
                        error={this.state.erPass}
                        helperText={this.state.messPass}
                      />
                    </Grid>
                    <h4>Vui lòng chọn ảnh đại diện</h4>
                    { // upload image product
                                          <FileBase64
                                              multiple={true}
                                              onDone={this.getFiles.bind(this)} 
                                              />
                                      }
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                        label="Thông tin bạn nhập là hoàn toàn chính xác"
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={this.handleSignUp}
                  >
                    Đăng ký
                </Button>
                </form>
              </div>
            </Container>
          )
}