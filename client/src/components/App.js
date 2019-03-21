import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
const Landing = () => <h2>Landing Page</h2>;
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>New Survey</h2>

const App = () => {
    return(
        <div>
            <BrowserRouter>
                <div>
                    <Header />
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/surveys" component={Dashboard} />
                    <Route path="/surveys/new" component={SurveyNew} />
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;