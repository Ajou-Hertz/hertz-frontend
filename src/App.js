import React, { useReducer, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Sign from "./pages/Sign";
import My from "./pages/My";
import Enroll from "./pages/Enroll";
import InstrumentList from "./pages/SubPage/Instrunment/InstrumentList";
import InstrumentDetail from "./pages/SubPage/Instrunment/InstrumentDetail";
import InstrumentModify from "./pages/SubPage/Instrunment/InstrumentModify";
import InstrumentUpload from "./pages/SubPage/Instrunment/InstrumentUpload";
import EnsembleRoomList from "./pages/SubPage/EnsembleRoom/EnsembleRoomList";
import EnsembleRoomDetail from "./pages/SubPage/EnsembleRoom/EnsembleRoomDetail";
import Reserve from "./pages/SubPage/EnsembleRoom/Reserve";
import ReserveLogout from "./pages/SubPage/EnsembleRoom/ReserveLogout";
import Review from "./pages/SubPage/EnsembleRoom/Review";
import WriteKeywordReview from "./pages/SubPage/EnsembleRoom/WriteKeywordReview";
import WriteTextReview from "./pages/SubPage/EnsembleRoom/WriteTextReview";
import ConcertHall from "./pages/SubPage/ConcertHall";
import FindEmail from "./pages/FindEmail";
import FindPW from "./pages/FindPW";
import Seller from "./pages/Seller";
import Inquiry from "./pages/Inquiry";
import KakaoRedirect from "./pages/KakaoRedirect";
import { marketsDummyData } from "./constants/data";

import { AuthProvider } from "./context/AuthProvider";
import MainLayout from "./components/MainLayout";
import RequireAuth from "./components/RequireAuth";
import UpdatePW from "./pages/UpdatePW";
import MyEditPage from "./pages/MyEdit";
// import SelfSign from "./pages/SelfSign";
// import requireAuth from "../components/RequireAuth";

const reducer = (state, action) => {
    let newState = [];
    switch (action.type) {
        case "INIT": {
            return action.data;
        }
        case "CREATE": {
            newState = [action.data, ...state];
            break;
        }
        case "REMOVE": {
            newState = state.filter((it) => it.id !== action.targetId);
            break;
        }
        case "EDIT": {
            newState = state.map((it) =>
                it.id === action.data.id ? { ...action.data } : it
            );
            break;
        }
        default:
            return state;
    }

    localStorage.setItem("diary", JSON.stringify(newState));
    return newState;
};
export const MarketStateContext = React.createContext();
export const MarketDispatchContext = React.createContext();

function App() {
    const marketList = marketsDummyData;
    const [data, dispatch] = useReducer(reducer, []);

    useEffect(() => {
        dispatch({ type: "INIT", data: marketsDummyData });
    }, []);

    // CREATE
    const onCreate = (date, content, emotion) => {
        dispatch({
            type: "CREATE",
            data: {
                date: new Date(date).getTime(),
                content,
                emotion,
            },
        });
    };
    // REMOVE
    const onRemove = (targetId) => {
        dispatch({ type: "REMOVE", targetId });
    };
    // EDIT
    const onEdit = (targetId, date, content, emotion) => {
        dispatch({
            type: "EDIT",
            data: {
                id: targetId,
                date: new Date(date).getTime(),
                content,
                emotion,
            },
        });
    };

    return (
        <AuthProvider>
            <MarketStateContext.Provider value={data}>
                <MarketDispatchContext.Provider
                    value={{
                        onCreate,
                        onEdit,
                        onRemove,
                    }}
                >
                    <BrowserRouter>
                        {/* <CssBaseline /> */}
                        <div className="App">
                            <MainLayout>
                                <Routes>
                                    <Route
                                        path="/"
                                        element={<Home />}
                                        exact={true}
                                    />
                                    <Route path="/login" element={<Login />} />
                                    {/* protected routes */}
                                    <Route
                                        path="/mypage"
                                        element={
                                            <RequireAuth>
                                                <My />
                                            </RequireAuth>
                                        }
                                    />
                                    <Route path="/sign" element={<Sign />} />
                                    <Route
                                        path="/*"
                                        element={
                                            localStorage.getItem(
                                                "recoil-persist"
                                            ) === '{"userState":null}' ? (
                                                <Navigate to="/login" />
                                            ) : (
                                                <InstrumentUpload />
                                            )
                                        }
                                    />
                                    <Route
                                        path="/enroll"
                                        element={<Enroll />}
                                    />
                                    <Route
                                        path="/InstrumentList"
                                        element={<InstrumentList />}
                                    />
                                    <Route
                                        path="/InstrumentDetail/:id"
                                        element={<InstrumentDetail />}
                                    />
                                    <Route
                                        path="/InstrumentModify"
                                        element={<InstrumentModify />}
                                    />
                                    <Route
                                        path="/EnsembleRoomList"
                                        element={<EnsembleRoomList />}
                                    />
                                    <Route
                                        path="/EnsembleRoomDetail"
                                        element={<EnsembleRoomDetail />}
                                    />
                                    <Route
                                        path="/Reserve"
                                        element={<Reserve />}
                                    />
                                    <Route
                                        path="/ReserveLogout"
                                        element={<ReserveLogout />}
                                    />
                                    <Route
                                        path="/Review"
                                        element={<Review />}
                                    />
                                    <Route
                                        path="/WriteKeywordReview"
                                        element={<WriteKeywordReview />}
                                    />
                                    <Route
                                        path="/WriteTextReview"
                                        element={<WriteTextReview />}
                                    />
                                    <Route
                                        path="/ConcertHall"
                                        element={<ConcertHall />}
                                    />
                                    <Route
                                        path="/findEmail"
                                        element={<FindEmail />}
                                    />
                                    <Route
                                        path="/findPw"
                                        element={<FindPW />}
                                    />
                                    <Route
                                        path="/seller"
                                        element={<Seller />}
                                    />
                                    <Route
                                        path="/inquiry"
                                        element={<Inquiry />}
                                    />
                                    {/* <Route
                                        path="/selfsign"
                                        element={<SelfSign />}
                                    /> */}
                                    <Route
                                        path="/kakao/authorize/redirect-test"
                                        element={<KakaoRedirect />}
                                    />
                                    <Route
                                        path="/myedit"
                                        element={<MyEditPage />}
                                    />
                                    <Route
                                        path="/updatePW"
                                        element={<UpdatePW />}
                                    />
                                </Routes>
                            </MainLayout>
                        </div>
                    </BrowserRouter>
                </MarketDispatchContext.Provider>
            </MarketStateContext.Provider>
        </AuthProvider>
    );
}

export default App;
