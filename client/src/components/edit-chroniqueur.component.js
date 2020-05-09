import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Translation } from 'react-i18next';
import i18next from 'i18next';
import "./file.css"
import DirectionProvider, { DIRECTIONS } from 'react-with-direction/dist/DirectionProvider';
export default class EditChroniqueur extends Component {
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
            num_tel: null,
            chroniqueurs: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/chroniqueurs/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    nom: response.data.nom,
                    prenom: response.data.prenom,
                    num_tel: response.data.num_tel,
                    date_naissance: new Date(response.data.date_naissance),
                })
            })
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

    onChangeNumTel(e) {
        this.setState({
            num_tel: e.target.value
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

        axios.post('http://localhost:5000/chroniqueurs/update/' + this.props.match.params.id, chroniqueur)
            .then(res => console.log(res.data));

        window.location = '/listChroniqueurs';
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
                    <h3 className={label}><Translation>{(t) => <>{t('Edit_chroniqueur.1')}</>}</Translation></h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label><Translation>{(t) => <>{t('Name.1')}</>}</Translation> </label>
                            <input type="text"
                                required
                                className="form-control"
                                value={this.state.nom}
                                onChange={this.onChangeNom} />
                        </div>
                        <div className="form-group">
                            <label><Translation>{(t) => <>{t('LastName.1')}</>}</Translation> </label>
                            <input type="text"
                                required
                                className="form-control"
                                value={this.state.prenom}
                                onChange={this.onChangePrenom}
                            />
                        </div>
                        <div className="form-group">
                            <label><Translation>{(t) => <>{t('Num_Tel.1')}</>}</Translation> </label>
                            <input type='number' required className="form-control"
                                value={this.state.num_tel} onChange={this.onChangeNumTel} />
                        </div>
                        <div className="form-group">
                            <label><Translation>{(t) => <>{t('Date_naissance.1')}</>}</Translation> </label>
                            <div>
                                <DatePicker
                                    selected={this.state.date_naissance} onChange={this.onChangeDate} />
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