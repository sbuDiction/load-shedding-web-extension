'use client'
import { useEffect, useState } from "react";
// import "./page.module.css";
// import 'bootstrap/dist/css/bootstrap.css';

import Search from "./pages/search";
import { fetchAreaByText, fetchLoadsheddingSchedule } from "./api";
import Loader from "./components/Loader";
import SearchResults from "./components/SearchResults";
import { convertTime } from "./helpers/time";


export default function App() {
  const [area, setArea] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [suburbName, setSuburbName] = useState('');
  const [loadSheddingSchedule, setSchedule] = useState();
  const stageColors = {
    1: 'yellow', // Stage 1
    2: 'orange', // Stage 2
    3: 'red', // Stage 3
    4: 'brown', // Stage 4
    5: 'black', // Stage 5
    6: 'skull', // Stage 6
  }

  const handleSearch = async () => {
    setLoading(true);
    await fetchAreaByText(area)
      .then((res) => {
        setLoading(false);
        setResults(res);
      });
  }
  const fetchSchedule = async () => {
    const areaId = localStorage.getItem('area_id');
    if (areaId) {
      await fetchLoadsheddingSchedule(areaId).then(schedule => {
        setShow(true);
        setLoading(false);
        setSchedule(schedule);
        let suburb = areaId.toString().match(/(\d+)|([A-Z][a-z]*)|(\(\d+\))/g);
        setSuburbName(`${suburb[2]} ${suburb[3]}`);

      });
    } else {
      setLoading(false);
    }
  }

  // const renderSchedule = () => {
  //   return
  // }
  useEffect(() => {

    fetchSchedule();
  }, []);
  return (
    <>
      {
        isLoading ?
          <Loader /> :
          <div>
            <main className="container m-2 text-center">
              {show ?
                <div className="schedule_section">
                  <div>
                    <h4 id="ls_heading" className="text-start">Load Shedding</h4>
                    <h6 id="ls_location_stage_heading" className="fw-bold mt-3 text-start">
                      {`${suburbName} Currently Stage ${loadSheddingSchedule['stage']}`}
                    </h6>
                    <div id="ls_info">
                      <h6 id="ls_date" className="fw-bolder text-start mt-3">{loadSheddingSchedule['date']}</h6>
                      <div className="mt-2">
                        {loadSheddingSchedule['schedule'].map((status, index) => (
                          <div className="ls_status" key={index}>
                            <div className="row align-items-center">
                              <div className="col-auto" id="ls_icon_container">
                                <span className="bi bi-clock" id="ls_icon_span">
                                  {status['stage'] >= 6 ?
                                    <i className="bi bi-exclamation-circle-fill" style={{ color: 'red' }}></i>
                                    :
                                    <svg id="ls_icon" xmlns="http://www.w3.org/2000/svg" style={{ color: `${stageColors[status['stage']]}` }} width="16" height="16"
                                      fill="currentColor" className="bi bi-circle-fill" viewBox="0 0 16 16">
                                      <circle cx="8" cy="8" r="8" />
                                    </svg>
                                  }
                                </span>
                              </div>

                              <div className="col-auto" id="ls_time_schedule_container">
                                <span id="time_and_schedule">{`${convertTime(status["start"])} - ${convertTime(status['end'])} : Stage ${status['stage']}`}</span>
                              </div>

                            </div>
                          </div>
                        ))}
                      </div>


                    </div>

                  </div>
                </div>
                :
                <div>
                  <Search setArea={setArea} handleSearch={handleSearch} />
                  <div id="search_results" className="m-2">
                    <SearchResults results={results} />
                  </div>
                </div>
              }


            </main>
          </div>
      }
    </>
  );
}
