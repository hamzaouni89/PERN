import React, { Component } from 'react';
import i18next from 'i18next';
import { Link } from 'react-router-dom';
import { Translation } from 'react-i18next';
import DirectionProvider, { DIRECTIONS } from 'react-with-direction/dist/DirectionProvider';

export default class Navbar extends Component {

    constructor(props) {
        super(props);

        this.state = { language: "fr" }
    }

    handleClick(lang) {
        i18next.changeLanguage(lang);
        this.setState({ language: lang })
    }

    render() {
        const language = this.state.language;
        let dir = null;
        if (language === "ar") {
            dir = DIRECTIONS.RTL;
        }else {
            dir = DIRECTIONS.LTR;
        }
        return (
            <div>
                <DirectionProvider direction={dir}>

                <nav className="navbar navbar-dark bg-danger navbar-expand-lg">
                    <Link to="/" className="navbar-brand">CRUD Emission</Link>
                    <div className="collpase navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/" className="nav-link"><Translation>{(t) => <>{t('Emissions.1')}</>}</Translation></Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/createEmission" className="nav-link"><Translation>{(t) => <>{t('Add_emission.1')}</>}</Translation></Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/createChroniqueur" className="nav-link"><Translation>{(t) => <>{t('Add_chroniqueur.1')}</>}</Translation></Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/listChroniqueurs" className="nav-link"><Translation>{(t) => <>{t('Chroniqueurs.1')}</>}</Translation></Link>
                            </li>

                        </ul>
                    </div>
                    <div>
                        <button className="btn btn-outline-warning" onClick={() => this.handleClick('fr')} ><Translation>{(t) => <>{t('FR.1')}</>}</Translation></button>
                        <button className="btn btn-outline-warning" onClick={() => this.handleClick('ar')} ><Translation>{(t) => <>{t('AR.1')}</>}</Translation></button>
                    </div>
                </nav>
               </DirectionProvider>
            </div>
        )
    }
}

