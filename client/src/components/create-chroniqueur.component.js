import React, { Component } from 'react';
import axios from 'axios';
import { Translation } from 'react-i18next';
import i18next from 'i18next';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import "./file.css"
import DirectionProvider, { DIRECTIONS } from 'react-with-direction/dist/DirectionProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import MuiPhoneNumber from "material-ui-phone-number";
toast.configure();
export default class CreateChroniqueur extends Component {
    constructor(props) {
        super(props);

        this.onChangeNom = this.onChangeNom.bind(this);
        this.onChangePrenom = this.onChangePrenom.bind(this);
        this.onChangeNumTel = this.onChangeNumTel.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            nom: "",
            prenom: "",
            date_naissance: new Date(),
            num_tel: "",
        }
    }

    onChangeNom(e) {
        this.setState({
            nom: e.target.value
        })
    }

    onChangePrenom(e) {
        this.setState({
            prenom: e.target.value
        })
    }

    onChangeNumTel(value) {
        this.setState({
            num_tel: value
        })
    }

    onChangeDate(date) {
        this.setState({
            date_naissance: date
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const chroniqueur = {
            nom: this.state.nom,
            prenom: this.state.prenom,
            num_tel: this.state.num_tel,
            date_naissance: this.state.date_naissance
        }

        axios.post('http://localhost:5000/chroniqueurs/add', chroniqueur)
            .then(res => console.log(res.data))
            .catch(res => { console.log(res) }
            );



        toast.success('Le chroniqueur a été ajouté avec succès !', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        window.location = '/listChroniqueurs';


    }


    render() {
        const language = i18next.languages[0];
        let dir = null;
        let label = null
        if (language === "ar") {
            dir = DIRECTIONS.RTL;
            label = "formlabel";
        } else {
            dir = DIRECTIONS.LTR;
        }
        return (
            <DirectionProvider direction={dir}>
                <div>
                    <h3 className={label}><Translation>{(t) => <>{t('Add_chroniqueur.1')}</>}</Translation></h3>
                    <ValidatorForm className={label} onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label><Translation>{(t) => <>{t('Name.1')}</>}</Translation> </label>
                            <TextValidator type="text"
                                required
                                variant="outlined"
                                className="form-control"
                                value={this.state.nom}
                                onChange={this.onChangeNom}
                                validators={['required', 'maxLength:25', 'minLength:5']}
                                errorMessages={['Ce champ est OBLIGATOIRE ', 'Maximax 8 chiffres', 'Maximax 5 chiffres']}
                            />
                        </div>
                        <div className="form-group">
                            <label><Translation>{(t) => <>{t('LastName.1')}</>}</Translation> </label>
                            <TextField type="text"
                                required
                                variant="outlined"
                                className="form-control"
                                value={this.state.prenom}
                                onChange={this.onChangePrenom}
                            />
                        </div>
                        <div className="form-group">
                            <label><Translation>{(t) => <>{t('Num_Tel.1')}</>}</Translation> </label>
                            <MuiPhoneNumber
                                required
                                variant="outlined"
                                defaultCountry={"tn"}
                                className="form-control"
                                value={this.state.num_tel}
                                onChange={this.onChangeNumTel}
                            />
                        </div>
                        <br></br>
                        <div className="form-group">
                            <label><Translation>{(t) => <>{t('Date_naissance.1')}</>}</Translation> </label>
                            <div>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        margin="normal"
                                        variant="outlined"
                                        id="date-picker-dialog"
                                        format="MM/dd/yyyy"
                                        value={this.state.date_naissance}
                                        onChange={this.onChangeDate}
                                        //selected={this.state.date_naissance}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </div>
                        </div>

                        <div className="form-group">
                            <Button type='submit' variant="contained" color="primary"
                            ><Translation>{(t) => <>{t('Add.1')}</>}</Translation></Button>
                        </div>
                    </ValidatorForm>
                </div>
            </DirectionProvider>
        )
    }
}