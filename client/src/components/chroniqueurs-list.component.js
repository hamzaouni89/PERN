import React, { Component } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { Translation } from 'react-i18next';
import {Link}  from 'react-router-dom';
import i18next from 'i18next';
import "./file.css"
import DirectionProvider, { DIRECTIONS } from 'react-with-direction/dist/DirectionProvider';
import { toast } from 'react-toastify';
toast.configure();
const Chroniqueur = props => (
    <tr>
        <td>{props.chroniqueur.nom}</td>
        <td>{props.chroniqueur.prenom}</td>
        <td>{props.chroniqueur.num_tel}</td>
        <td>{props.chroniqueur.date_naissance.substring(0, 10)}</td>
        <td>
            <Link className="btn btn-info" to={"/editChroniqueur/" + props.chroniqueur.chroniqueur_id}><Translation>{(t) => <>{t('Edit.1')}</>}</Translation></Link>
            <button className="btn btn-danger" href="/listChroniqueurs" onClick={() => { props.deleteChroniqueur(props.chroniqueur.chroniqueur_id) }}><Translation>{(t) => <>{t('Delete.1')}</>}</Translation></button>
            <button className="btn btn-warning" onClick={() => { props.createAndDownloadPdf(props.chroniqueur.chroniqueur_id) }}> <Translation>{(t) => <>{t('Print.1')}</>}</Translation></button>
        </td>
    </tr>
)
export default class ChroniqueursList extends Component {
    constructor(props) {
        super(props);

        this.deleteChroniqueur = this.deleteChroniqueur.bind(this);
        this.createAndDownloadPdf = this.createAndDownloadPdf.bind(this);

        this.state = { chroniqueurs: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/chroniqueurs/')
            .then(response => {
                this.setState({
                    chroniqueurs: response.data
                });
            }
            )
            .catch((error) => console.log(error));
    }

    deleteChroniqueur(id) {
        axios.delete('http://localhost:5000/chroniqueurs/' + id)
            .then(res => console.log(res.data));
        this.setState({
            chroniqueurs: this.state.chroniqueurs.filter(element => element.chroniqueur_id !== id)
        })
        toast.success('Le chroniqueur a été supprimé avec succès !', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    chroniqueursList() {
        return this.state.chroniqueurs.map(chroniqueur => {
            return <Chroniqueur chroniqueur={chroniqueur} deleteChroniqueur={this.deleteChroniqueur} createAndDownloadPdf={this.createAndDownloadPdf} key={chroniqueur.chroniqueur_id} />;
        })
    }

    createAndDownloadPdf = (id) => {
        axios.get('http://localhost:5000/chroniqueurs/' + id)
            .then(response => {
                this.setState({
                    chroniqueur: response.data
                });
                let Chro = this.state.chroniqueur;
                Chro.langue =  i18next.languages[0] ;

                axios.post('http://localhost:5000/createpdf', Chro)
                .then(() => axios.get('http://localhost:5000/fetchpdf', { responseType: 'blob' }))
                    .then((res) => {
                        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

                        saveAs(pdfBlob, 'newPdf.pdf');
                    })
            })

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
                    <h3 className={label}><Translation>{(t) => <>{t('Chroniqueurs.1')}</>}</Translation></h3>
                    <table className="table">
                        <thead className="thead-light">
                            <tr>
                                <th><Translation>{(t) => <>{t('Name.1')}</>}</Translation></th>
                                <th><Translation>{(t) => <>{t('LastName.1')}</>}</Translation></th>
                                <th><Translation>{(t) => <>{t('Date_naissance.1')}</>}</Translation></th>
                                <th><Translation>{(t) => <>{t('Num_Tel.1')}</>}</Translation></th>
                                <th><Translation>{(t) => <>{t('Action.1')}</>}</Translation></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.chroniqueursList()}
                        </tbody>
                    </table>
                </div>
            </DirectionProvider>
        )
    }
}