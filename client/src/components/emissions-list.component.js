import React, { Component } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { Translation } from 'react-i18next';
import {Link}  from 'react-router-dom';
import i18next from 'i18next';
import "./file.css"
import DirectionProvider, { DIRECTIONS } from 'react-with-direction/dist/DirectionProvider';

const Emission = props => (
    <tr>
        <td>{props.emission.nom_emission}</td>
        <td>{props.emission.dure}</td>
        <td>{props.emission.date_emission.substring(0, 10)}</td>
        <td>{props.emission.animateur}</td>
        <td>{props.emission.visiteur}</td>
        <td>{props.emission.nom}</td>
        <td>
            <Link className="btn btn-info" to={"/editEmission/" + props.emission.emission_id}><Translation>{(t) => <>{t('Edit.1')}</>}</Translation></Link>
            <button className="btn btn-danger" href="/" onClick={() => { props.deleteEmission(props.emission.emission_id) }}><Translation>{(t) => <>{t('Delete.1')}</>}</Translation></button>
            <button className="btn btn-warning" onClick={() => { props.createAndDownloadPdf(props.emission.emission_id) }}> <Translation>{(t) => <>{t('Print.1')}</>}</Translation></button>
        </td>
    </tr>
)

export default class EmissionsList extends Component {
    constructor(props) {
        super(props);

        this.deleteEmission = this.deleteEmission.bind(this);
        this.createAndDownloadPdf = this.createAndDownloadPdf.bind(this);

        this.state = {
            emissions: [],
            chroniqueur: "",
            chroniqueur_id: 0,
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/emissions/')
            .then(response => {
                this.setState({
                    emissions: response.data
                });
            }
            )
            .catch((error) => console.log(error));
    }

    deleteEmission(id) {
        axios.delete('http://localhost:5000/emissions/' + id)
            .then(res => console.log(res.data));
        this.setState({
            emissions: this.state.emissions.filter(element => element.emission_id !== id)
        })
    }

    emissionsList() {
        return this.state.emissions.map(emission => {
                 console.log(emission); 
            return <Emission emission={emission}  createAndDownloadPdf={this.createAndDownloadPdf} deleteEmission={this.deleteEmission} key={emission.emission_id} />;

        })
    }

    createAndDownloadPdf = (id) => {
        axios.get('http://localhost:5000/emissions/' + id)
            .then(response => {
                this.setState({
                    emission: response.data
                });
                let Emi = this.state.emission;

                axios.get('http://localhost:5000/chroniqueurs/' + this.state.emission.id_chroniqueur)
                    .then(response => {
                        this.setState({
                            chroniqueur: response.data
                        });
                        
                        Emi.chroniqueur = this.state.chroniqueur;
                        Emi.langue = i18next.languages[0];
                        console.log("Emi : ", Emi);
                        axios.post('http://localhost:5000/create-pdf',  Emi)
                            .then(() => axios.get('http://localhost:5000/fetch-pdf', { responseType: 'blob' }))
                            .then((res) => {
                                const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

                                saveAs(pdfBlob, 'newPdf.pdf');
                            })
                    })
            }
            )
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
                    <h3 className={label}><Translation>{(t) => <>{t('List.1')}</>}</Translation></h3>
                    <table className="table">
                        <thead className="thead-light">
                            <tr>
                                <th><Translation>{(t) => <>{t('Name.1')}</>}</Translation></th>
                                <th><Translation>{(t) => <>{t('Dure.1')}</>}</Translation></th>
                                <th><Translation>{(t) => <>{t('Date_emission.1')}</>}</Translation></th>
                                <th><Translation>{(t) => <>{t('Visiteur.1')}</>}</Translation></th>
                                <th><Translation>{(t) => <>{t('Animateur.1')}</>}</Translation></th>
                                <th><Translation>{(t) => <>{t('Chroniqueur.1')}</>}</Translation></th>
                                <th><Translation>{(t) => <>{t('Action.1')}</>}</Translation></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.emissionsList()}
                        </tbody>
                    </table>

                </div>
            </DirectionProvider>
        )
    }
}

