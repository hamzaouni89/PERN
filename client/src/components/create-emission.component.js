import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Translation } from 'react-i18next';
import i18next from 'i18next';
import "./file.css"
import DirectionProvider, { DIRECTIONS } from 'react-with-direction/dist/DirectionProvider';

import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
toast.configure();

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
export default class CreateEmission extends Component {
    constructor(props) {
        super(props);

        this.onChangeNom = this.onChangeNom.bind(this);
        this.onChangeDure = this.onChangeDure.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeAnimateur = this.onChangeAnimateur.bind(this);
        this.onChangeVisiteur = this.onChangeVisiteur.bind(this);
        this.onChangeChroniqueur = this.onChangeChroniqueur.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            nom_emission: "",
            dure: 0,
            date_emission: new Date(),
            animateur: "",
            visiteur: "",
            id_chroniqueur: 0,
            chroniqueurs: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/chroniqueurs/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        chroniqueurs: response.data,
                        id_chroniqueur: response.data[0].chroniqueur_id
                    })

                }
            })
    }

    onChangeNom(e) {
        this.setState({
            nom_emission: e.target.value
        })
    }

    onChangeDure(e) {
        this.setState({
            dure: e.target.value
        })
    }

    onChangeVisiteur(e) {
        this.setState({
            visiteur: e.target.value
        })
    }

    onChangeAnimateur(e) {
        this.setState({
            animateur: e.target.value
        })
    }

    onChangeChroniqueur(e) {
        this.setState({
            id_chroniqueur: e.target.value
        })
    }

    onChangeDate(date) {
        this.setState({
            date_emission: date
        })
    }


    onSubmit(e) {
        e.preventDefault();
        const emission = {
            nom_emission: this.state.nom_emission,
            dure: this.state.dure,
            visiteur: this.state.visiteur,
            animateur: this.state.animateur,
            id_chroniqueur: this.state.id_chroniqueur,
            date_emission: this.state.date_emission
        }

        axios.post('http://localhost:5000/emissions/add', emission)
            .then(res => console.log(res.data));
        toast.success("L'emission a été ajouté avec succès !", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
        });

        window.location = '/';
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
                <div >
                    <h3 className={label}><Translation>{(t) => <>{t('Add_emission.1')}</>}</Translation></h3>
                    <form className={label} onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label className="form-label control-label"  ><Translation>{(t) => <>{t('Name.1')}</>}</Translation> </label>
                            <input type="text"
                                required
                                className="form-control"
                                value={this.state.nom_emission}
                                onChange={this.onChangeNom}
                            />
                        </div>
                        <div className="form-group">
                            <label><Translation>{(t) => <>{t('Dure.1')}</>}</Translation></label>
                            <input type="number"
                                required
                                className="form-control"
                                value={this.state.dure}
                                onChange={this.onChangeDure}
                            />
                        </div>
                        <div className="form-group">
                            <label><Translation>{(t) => <>{t('Animateur.1')}</>}</Translation> </label>
                            <input type="text"
                                required
                                className="form-control"
                                value={this.state.animateur}
                                onChange={this.onChangeAnimateur}
                            />
                        </div>
                        <div className="form-group">
                            <label><Translation>{(t) => <>{t('Visiteur.1')}</>}</Translation> </label>
                            <input type="text"
                                required
                                className="form-control"
                                value={this.state.visiteur}
                                onChange={this.onChangeVisiteur}
                            />
                        </div>
                        <div className="form-group">
                            <label><Translation>{(t) => <>{t('Chroniqueur.1')}</>}</Translation> </label>
                            <div className="row">
                                <div className="col-sm-10">
                                    <select
                                        required
                                        className="form-control"
                                        value={this.state.id_chroniqueur}
                                        onChange={this.onChangeChroniqueur}>
                                        {

                                            this.state.chroniqueurs.map(function (chroniqueur) {
                                                return <option
                                                    key={chroniqueur.chroniqueur_id}
                                                    value={chroniqueur.chroniqueur_id}>{chroniqueur.nom}
                                                </option>

                                            })
                                        }
                                    </select>
                                    <br></br>
                                    <Autocomplete
                                        multiple
                                        id="checkboxes-tags-demo"
                                        options={this.state.chroniqueurs}
                                        disableCloseOnSelect
                                        getOptionLabel={(option) => option.nom}
                                        renderOption={(option, { selected }) => (
                                            <React.Fragment>
                                                <Checkbox
                                                    icon={icon}
                                                    checkedIcon={checkedIcon}
                                                    style={{ marginRight: 8 }}
                                                    checked={selected}
                                                />
                                                {option.nom}
                                            </React.Fragment>
                                        )}
                                        style={{ width: 500 }}
                                        renderInput={(params) => (
                                            <TextField {...params} variant="outlined"  placeholder="Chroniqueurs" />
                                        )}
                                    />
                                </div>
                                <div className="col-sm-2" >
                                    <a className="btn btn-danger" href='/createChroniqueur'> <Translation>{(t) => <>{t('Add.1')}</>}</Translation></a>
                                </div>

                            </div>

                        </div>
                        <div className="form-group">
                            <label><Translation>{(t) => <>{t('Date_emission.1')}</>}</Translation> </label>
                            <div>
                                <DatePicker
                                    selected={this.state.date_emission} onChange={this.onChangeDate} />
                            </div>
                        </div>
                        <div className="form-group">
                            <button type='submit' className="btn btn-primary"
                            ><Translation>{(t) => <>{t('Add.1')}</>}</Translation></button>
                        </div>
                    </form>
                </div>
            </DirectionProvider>
        )
    }
}