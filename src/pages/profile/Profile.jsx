import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Header } from '../../components';
import styles from "./profile.module.css";
import AccordionStyles from "./Accordion.module.css";
import { FiPlus, FiMinus } from "react-icons/fi";
import { IconContext } from "react-icons";
import { updatePassword } from "../../store/action/workerAction";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Profile = () => {
	const dispatch = useDispatch();
	const {worker} = useSelector((state) =>  state.worker);
	const [workerData, setWorkerData] = useState({
		firstName: worker?.firstName,
		lastName: worker?.lastName,
		email: worker?.email,
		phone: worker?.phone
	})
	let [passwordData, setPasswordData] = useState({
		oldPassword: "",
		newPassword: "",
		confirmPassword: ""
	});

	useEffect(() => {
		if(worker){
			setWorkerData({
				firstName: worker.firstName,
				lastName: worker.lastName,
				email: worker.email,
				phone: worker.phone
			})
		}
	}, [worker]);

	const [clicked, setClicked] = useState(false);

	const toggle = (index) => {
		if (clicked === index) {
			//if clicked question is already active, then close it
			return setClicked(null);
		}
		setClicked(index);
	};

	let onPasswordDataInputChange = (e, field) => {
    setPasswordData({
      ...passwordData,
      [field]: e.target.value,
    });
  };

	let onPasswordUpdate = (e) => {
		e.preventDefault()
		if(passwordData.oldPassword == ""){
			return toast.error("Old password required");
		}
		if(passwordData.newPassword == ""){
			return toast.error("New password required");
		}
		if(passwordData.confirmPassword == ""){
			return toast.error("Confirm password required");
		}
		if(passwordData.newPassword != passwordData.confirmPassword){
			return toast.error("New password and Confirm password not match");
		}
		dispatch(updatePassword(passwordData))
	}

	return (
		<>
			{false ?
				(
					<Loader />

				) : (
					<div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
						<Header category="Page" title="Profile" />
						<section className=''>
							<div className=''>

								<div className={AccordionStyles.Accordion_FAQs}>
									<div
										className={AccordionStyles.Wrap}
										onClick={() => toggle(0)}
									>
										<div className={AccordionStyles.Question}>
											<h5>Account details</h5>
											<span>{clicked === 0 ? <FiMinus /> : <FiPlus />}</span>
										</div>
									</div>

									{clicked === 0 ? (
										<div className={AccordionStyles.Dropdown}>

											{/* <div className={styles.title}>Edit your account details</div> */}
											<div className={styles.content}>
												<form method="post">
													<div className={styles["user-details"]}>
														<div className={styles["input-box"]}>
															<span className={styles.details}>First Name</span>
															<input
																type="text"
																name="firstName"
																placeholder="First Name"
																defaultValue={workerData.firstName}
																readOnly
															/>
														</div>
														<div className={styles["input-box"]}>
															<span className={styles.details}>Last Name</span>
															<input
																type="text"
																name="lastName"
																placeholder="Last Name"
																defaultValue={workerData.lastName}
																readOnly
															/>
														</div>
														<div className={styles["input-box"]}>
															<span className={styles.details}>Email</span>
															<input
																type="email"
																name="email"
																placeholder="Email"
																defaultValue={workerData.email}
																readOnly
															/>
														</div>
														<div className={styles["input-box"]}>
															<span className={styles.details}>Phone Number</span>
															<input
																name="phone"
																type="number"
																placeholder="Phone Number"
																defaultValue={workerData.phone}
																readOnly
															/>
														</div>
													</div>
													{/* <div className="text-center">
														<button className={styles.submit_btn}>Update</button>
													</div> */}
												</form>
											</div>

										</div>
									) : null}
								</div>

								<div className={AccordionStyles.Accordion_FAQs}>
									<div
										className={AccordionStyles.Wrap}
										onClick={() => toggle(1)}
									>
										<div className={AccordionStyles.Question}>
											<h5>Change your password</h5>
											<span>{clicked === 1 ? <FiMinus /> : <FiPlus />}</span>
										</div>
									</div>

									{clicked === 1 ? (
										<div className={AccordionStyles.Dropdown}>

											<div className={styles.content}>
											<form method="post">
											<div className={styles["user-details"]}>
												<div className={styles["input-box2"]}>
													<span className={styles.details}>Old Password</span>
													<input
														type="text"
														name="oldPassword"
														placeholder="Old Password"
														onChange={(e) => {
                          		onPasswordDataInputChange(e, "oldPassword");
														}}
													/>
												</div>
												<div className={styles["input-box2"]}>
													<span className={styles.details}>New Password</span>
													<input
														type="text"
														name="newPassword"
														placeholder="New Password"
														onChange={(e) => {
                          		onPasswordDataInputChange(e, "newPassword");
														}}
													/>
												</div>
												<div className={styles["input-box2"]}>
													<span className={styles.details}>Confirm Password</span>
													<input
														type="text"
														name="confirmPassword"
														placeholder="Confirm Password"
														onChange={(e) => {
                          		onPasswordDataInputChange(e, "confirmPassword");
														}}
													/>
												</div>
											</div>
											<div className="text-center">
												<button className={styles.submit_btn} onClick={(e) => onPasswordUpdate(e)}>Update</button>
											</div>
										</form>
											</div>

										</div>
									) : null}
								</div>

							</div>
						</section>
					</div>
				)}
		</>
	);
};

export default Profile;
