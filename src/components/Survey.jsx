import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Survey = () => {
    const [answers, setAnswers] = useState({
        origin: '',
        integration: '',
        languages: []
    });
    const [submitted, setSubmitted] = useState(false);
    const [allResponses, setAllResponses] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setAllResponses([...allResponses, answers]);
        setSubmitted(true);
        setAnswers({
            origin: '',
            integration: '',
            languages: []
        });
    };

    const handleLanguageChange = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
            setAnswers({...answers, languages: [...answers.languages, value]});
        } else {
            setAnswers({...answers, languages: answers.languages.filter(lang => lang !== value)});
        }
    };

    // Prepare data for charts
    const originData = {
        labels: [...new Set(allResponses.map(r => r.origin))],
        datasets: [{
            data: [...new Set(allResponses.map(r => r.origin))].map(
                origin => allResponses.filter(r => r.origin === origin).length
            ),
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40'
            ]
        }]
    };

    const integrationData = {
        labels: ['Sehr gut', 'Gut', 'Mittelmäßig', 'Schlecht', 'Sehr schlecht'],
        datasets: [{
            label: 'Integration',
            data: [
                allResponses.filter(r => r.integration === 'Sehr gut').length,
                allResponses.filter(r => r.integration === 'Gut').length,
                allResponses.filter(r => r.integration === 'Mittelmäßig').length,
                allResponses.filter(r => r.integration === 'Schlecht').length,
                allResponses.filter(r => r.integration === 'Sehr schlecht').length
            ],
            backgroundColor: '#36A2EB'
        }]
    };

    const languagesData = {
        labels: ['Deutsch', 'Englisch', 'Türkisch', 'Arabisch', 'Russisch', 'Andere'],
        datasets: [{
            data: [
                allResponses.filter(r => r.languages.includes('Deutsch')).length,
                allResponses.filter(r => r.languages.includes('Englisch')).length,
                allResponses.filter(r => r.languages.includes('Türkisch')).length,
                allResponses.filter(r => r.languages.includes('Arabisch')).length,
                allResponses.filter(r => r.languages.includes('Russisch')).length,
                allResponses.filter(r => r.languages.includes('Andere')).length
            ],
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40'
            ]
        }]
    };

    return (
        <section className="survey">
            <h2>Schulumfrage</h2>
            <div className="survey-container">
                <div className="survey-form">
                    <h3>Teilnehmen an der Umfrage</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Woher kommst du ursprünglich?</label>
                            <select 
                                value={answers.origin}
                                onChange={(e) => setAnswers({...answers, origin: e.target.value})}
                                required
                            >
                                <option value="">Bitte wählen</option>
                                <option value="Deutschland">Deutschland</option>
                                <option value="Türkei">Türkei</option>
                                <option value="Syrien">Syrien</option>
                                <option value="Afghanistan">Afghanistan</option>
                                <option value="Ukraine">Ukraine</option>
                                <option value="Andere">Andere</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Wie gut fühlst du dich in der Schule integriert?</label>
                            <select 
                                value={answers.integration}
                                onChange={(e) => setAnswers({...answers, integration: e.target.value})}
                                required
                            >
                                <option value="">Bitte wählen</option>
                                <option value="Sehr gut">Sehr gut</option>
                                <option value="Gut">Gut</option>
                                <option value="Mittelmäßig">Mittelmäßig</option>
                                <option value="Schlecht">Schlecht</option>
                                <option value="Sehr schlecht">Sehr schlecht</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Welche Sprachen sprichst du fließend?</label>
                            <div className="checkbox-group">
                                <label>
                                    <input 
                                        type="checkbox" 
                                        value="Deutsch"
                                        checked={answers.languages.includes('Deutsch')}
                                        onChange={handleLanguageChange}
                                    />
                                    Deutsch
                                </label>
                                <label>
                                    <input 
                                        type="checkbox" 
                                        value="Englisch"
                                        checked={answers.languages.includes('Englisch')}
                                        onChange={handleLanguageChange}
                                    />
                                    Englisch
                                </label>
                                <label>
                                    <input 
                                        type="checkbox" 
                                        value="Türkisch"
                                        checked={answers.languages.includes('Türkisch')}
                                        onChange={handleLanguageChange}
                                    />
                                    Türkisch
                                </label>
                                <label>
                                    <input 
                                        type="checkbox" 
                                        value="Arabisch"
                                        checked={answers.languages.includes('Arabisch')}
                                        onChange={handleLanguageChange}
                                    />
                                    Arabisch
                                </label>
                                <label>
                                    <input 
                                        type="checkbox" 
                                        value="Russisch"
                                        checked={answers.languages.includes('Russisch')}
                                        onChange={handleLanguageChange}
                                    />
                                    Russisch
                                </label>
                                <label>
                                    <input 
                                        type="checkbox" 
                                        value="Andere"
                                        checked={answers.languages.includes('Andere')}
                                        onChange={handleLanguageChange}
                                    />
                                    Andere
                                </label>
                            </div>
                        </div>

                        <button type="submit" className="submit-btn">
                            Absenden
                        </button>
                    </form>
                </div>

                {submitted && (
                    <div className="survey-results">
                        <h3>Umfrageergebnisse</h3>
                        <div className="results-grid">
                            <div className="result-card">
                                <h4>Herkunftsländer</h4>
                                <Pie data={originData} />
                            </div>
                            <div className="result-card">
                                <h4>Integration</h4>
                                <Bar 
                                    data={integrationData}
                                    options={{
                                        scales: {
                                            y: {
                                                beginAtZero: true,
                                                ticks: {
                                                    stepSize: 1
                                                }
                                            }
                                        }
                                    }}
                                />
                            </div>
                            <div className="result-card">
                                <h4>Sprachen</h4>
                                <Pie data={languagesData} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Survey; 