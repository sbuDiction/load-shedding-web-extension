'use client'
import { useState } from "react";
import { fetchAreaByText } from "../api";

const Search = ({ setArea, handleSearch }) => {
    return (
        <div id="search_container" className="hidden container ">
            <div className="row justify-content-end">
                <div className="col">
                    <h6>Search By Text</h6>
                </div>
            </div>
            <div className="row text-center">
                <div className="col">
                    <div id="search_form">
                        <form className="d-flex gap-1">
                            <input
                                className="form-control m-1"
                                onChange={(e) => setArea(e.target.value)}
                                type="search"
                                placeholder="Type in your suburb/village"
                                aria-label="Search"
                                id="area_input"
                                autoFocus />
                            <button
                                type="button"
                                className="btn btn-success search_btn"
                                onClick={handleSearch}
                                id="search_btn">
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;