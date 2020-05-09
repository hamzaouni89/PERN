import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Translation } from 'react-i18next';
import i18next from 'i18next';
import "./file.css"
import DirectionProvider, { DIRECTIONS } from 'react-with-direction/dist/DirectionProvider';
export default class EditEmission extends Component {
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
            chroniqueurs: [],
            emisssions: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/emissions/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    nom_emission: response.data.nom_emission,
                    dure: response.data.dure,
                    visiteur: response.data.visiteur,
                    animateur: response.data.animateur,
                    id_chroniqueur: response.data.id_chroniqueur,
                    date_emission: new Date(response.data.date_emission),
                })
            })

        axios.get('http://localhost:5000/chroniqueurs/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        chroniqueurs: response.data,
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

        axios.post('http://localhost:5000/emissions/update/' + this.props.match.params.id, emission)
            .then(res => console.log(res.data));

        window.location = '/';
    }
    render() {
        const language = i18next.languages[0];
        let dir = null;
        let label = null
        if (language === "ar") {
            dir = DIRECTIONS.RTL;
            label = "formlabel" ;
        } else {
            dir = DIRECTIONS.LTR;
        }
        return (
            <DirectionProvider direction={dir}>
                <div>
                    <h3 className={label}><Translation>{(t) => <>{t('Edit_emission.1')}</>}</Translation></h3>
                    <form className={label} onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label><Translation>{(t) => <>{t('Name.1')}</>}</Translation></label>
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
                            ><Translation>{(t) => <>{t('Edit.1')}</>}</Translation></button>
                        </div>
                    </form>
                </div>
            </DirectionProvider>
        );
    }
}