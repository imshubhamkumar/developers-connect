import PasswordStr from './PasswordStr';
import './registration.css'
const SignUpForm = ({
    history,
    onSubmit,
    onChange,
    errors,
    user,
    score,
    btnTxt,
    type,
    pwMask,
    onPwChange
}) => {
   const educationLavel = [
        {name:'Some High School'},
        {name:'High School Diploma / GED'},
        {name:'Some college'},
        {name:'Associate degree'},
        {name:'Bachelor\'s degree'},
        {name:'Master\'s degree or Higher'}
    ]
    return(
        <div className="main">
            <div className="text-center mb-4"><h3>Sign Up</h3></div>
            <form className="form" onSubmit={onSubmit}>
            <div className="row">
            {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}
                <div className="col-md-6 col-sm-12">
                    <input className="form-control un" name="fullName" value={user.fullName} type="text" onChange={onChange} autoComplete="off" placeholder="Full Name"/>
                </div>
                <div className="col-md-6 col-sm-12">
                    <input className="form-control un" name="email" value={user.email} type="text" onChange={onChange} autoComplete="off" placeholder="Email id"/>
                </div>
                <div className="col-md-6 col-sm-12">
                    <div className="password-container">
                    <input type={type} className="form-control un mb-0" name="password" value={user.password} onChange={onPwChange} autoComplete="off" placeholder="Create Password"/>
                    <div className="pwStrRow">
                        {score >= 1 && (
                            <div>
                            <PasswordStr score={score} /> 
                            <button 
                                className="btn btn-outline-secondary" 
                                label={btnTxt} onClick={pwMask} 
                                style={{position: 'relative', left: '50%', transform: 'translateX(-50%)'}} 
                            >{btnTxt}</button>
                            </div>
                            )} 
                    </div>
                    </div>
                </div>
                <div className="col-md-6 col-sm-12">
                    <input className="form-control un"  name="location" value={user.location} type="text" onChange={onChange} autoComplete="off" placeholder="Location"/>
                </div>
                <div className="col-md-6 col-sm-12">
                    <select className="form-control lv" name="education" value={user.education} onChange={onChange}>
                    <option disabled value=''>Highest Digree</option>
                        {educationLavel.map((level, i) => <option key={level.name+i} value={level.name}>{level.name}</option>)}
                    </select>
                </div>
                <div className="col-md-6 col-sm-12">
                    <input className="form-control un" name="university" value={user.university} type="text" onChange={onChange} autoComplete="off" placeholder="Collage/University"/>
                </div>
                <div className="col-md-6 col-sm-12">
                    <input className="form-control un" name="cs" value={user.cs} type="number" min="0" step="1" onChange={onChange} autoComplete="off" placeholder="Challenges Solved"/>
                </div>
                <div className="col-md-6 col-sm-12">
                    <input className="form-control un" name="ss" value={user.ss} type="number" min="0" step="1" onChange={onChange} autoComplete="off" placeholder="Solution submited"/>
                </div>
                <div className="col-md-6 col-sm-12">
                     <input className="form-control un" name="sa" value={user.sa} type="number" min="0" step="1" onChange={onChange} autoComplete="off" placeholder="Solution Accepted"/>
                </div>
                <div className="col-md-6 col-sm-12">
                    <label htmlFor="formControlRange">Proficiance in Data Structure</label>
                    <input type="range" title="test" value={user.ds} onChange={onChange} min="1" max="100" name="ds" className="form-control-range" id="formControlRange"/>
                </div>
                <div className="col-md-6 col-sm-12">
                    <label htmlFor="formControlRange">Proficiance in Algorithms</label>
                    <input type="range" min={1} max={100} value={user.algo} name="algo" onChange={onChange} className="form-control-range"/>
                    {/* <input className="form-control un" name="algo" value={user.algo} type="text" onChange={onChange} autoComplete="off" placeholder="Proficiance in Algorithms (%)"/> */}
                </div>
                <div className="col-md-6 col-sm-12">
                    <label htmlFor="formControlRange">Proficiance in C++</label>
                    <input type="range" min={1} max={100} value={user.cpp} onChange={onChange} name="cpp" className="form-control-range"/>
                    {/* <input className="form-control un" name="cpp" value={user.cpp} type="text" onChange={onChange} autoComplete="off" placeholder="Proficiance in C++ (%)"/> */}
                </div>
                <div className="col-md-6 col-sm-12">
                    <label htmlFor="formControlRange">Proficiance in HTML</label>
                    <input type="range" min={1} max={100} value={user.html} onChange={onChange} name="html" className="form-control-range"/>
                    {/* <input className="form-control un" name="html" value={user.html} type="text" onChange={onChange} autoComplete="off" placeholder="Proficiance in HTML (%)"/> */}
                </div>
                <div className="col-md-6 col-sm-12">
                    <label htmlFor="formControlRange">Proficiance in Java</label>
                    <input type="range" min={1} max={100} value={user.java} onChange={onChange} name="java" className="form-control-range"/>
                    {/* <input className="form-control un" name="java" value={user.java} type="text" onChange={onChange} autoComplete="off" placeholder="Proficiance in Java (%)"/> */}
                </div>
                <div className="col-md-6 col-sm-12">
                    <label htmlFor="formControlRange">Proficiance in JavaScript</label>
                    <input type="range" min={1} max={100} value={user.js} onChange={onChange} name="js" className="form-control-range"/>
                    {/* <input className="form-control un" name="js" value={user.js} type="text" onChange={onChange} autoComplete="off" placeholder="Proficiance in JavaScript (%)"/> */}
                </div>
                <div className="col-md-6 col-sm-12">
                    <label htmlFor="formControlRange">Proficiance in Python</label>
                    <input type="range" min={1} max={100} value={user.py} onChange={onChange} name="py" className="form-control-range"/>
                    {/* <input className="form-control un" name="py" value={user.py} type="text" onChange={onChange} autoComplete="off" placeholder="Proficiance in Python (%)"/> */}
                </div>
                <div className="col-md-12 mt-4">
                    <button type="submit" className="signup-submit" aligne="center">Sign Up</button>
                </div>
            </div>
        </form>
        </div>
    )
}

export default SignUpForm;