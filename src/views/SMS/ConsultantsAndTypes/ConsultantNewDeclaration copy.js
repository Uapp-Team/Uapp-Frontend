import React from "react";
import { Card, CardBody, Table } from "reactstrap";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import { useHistory, useParams } from "react-router-dom";

const ConsultantNewDeclaration = () => {
  const { consultantRegisterId } = useParams();
  return (
    <div>
      {" "}
      <BreadCrumb
        title="Consultant Declaration"
        backTo={consultantRegisterId ? "Terms & Conditions" : null}
        path={`/consultantTermsInformation/${consultantRegisterId}`}
      />
      <Card>
        <CardBody id="application">
          <h2 className="mb-3 ">
            <b className="bg-u">INDEX FOR UAPP EMPLOYEE HANDBOOK</b>
          </h2>
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>
                1 Place of Posting and Assignment <br /> <br />
                <span className="conscentText-style">
                  1.1 Whole Time Service-not working elsewhere <br /> 1.2 Duties{" "}
                  <br /> 1.3 Penalty for failure to comply with rules. <br />{" "}
                  1.4 Whistleblowing <br /> 1.5 Public Interest Disclosure Act
                </span>
              </b>
              <br />
              <br />
              <b>
                2 Confidentiality of resources and information
                <br /> <br />
                <span className="conscentText-style">
                  2.1 Copyrights R & D <br /> 2.2 Confidentiality. <br /> 2.3
                  Bribery Act
                </span>
              </b>
              <br />
              <br />
              <b>
                3 Interns and Trainees
                <br /> <br />
                <span className="conscentText-style">
                  3.1 Status and termination <br />
                  3.2 Stipend and commission <br /> 3.3 Exit process <br /> 3.4
                  Failure to serve notice period <br /> 3.5 Conversion to
                  permanent role
                </span>
              </b>
              <br /> <br />
              <b>
                4 Termination
                <br /> <br />
                <span className="conscentText-style">
                  4.1 Resignation <br /> 4.2 By notice from company <br /> 4.3
                  Due to non-performance <br /> 4.4 Liability of Employee after
                  Termination <br /> 4.5 Reference
                </span>
              </b>
              <br /> <br />
              <b>5 Retirement</b>
              <br /> <br />
              <b>
                6 Performance Reviews
                <br /> <br />
                <span className="conscentText-style">
                  6.1 Factors of appraisal and performance review <br /> 6.2
                  Conduct <br /> 6.3 Clothing <br /> 6.4 Communication Ethics
                </span>
              </b>
              <br /> <br />
              <b>7 Working Hours</b>
              <br /> <br />
              <b>
                8 Client Service
                <br /> <br />
                <span className="conscentText-style">
                  8.1 No fee policy <br />
                  8.2 Data protection <br /> 8.3 Misleading information <br />{" "}
                  8.4 Conflict of interest. <br /> 8.5 Client poaching <br />
                  8.6 Social Media Usage Policy <br /> 8.7 Communication
                  standards 8.8 False Documentation
                </span>
              </b>
              <br /> <br />
              <b>
                9 Holidays
                <br /> <br />
                <span className="conscentText-style">
                  9.1 Paid Holidays <br /> 9.2 Maternity Leave <br />
                  9.2.1 Leave Entitlement <br /> 9.2.2 Payment entitlement
                  (maternity pay and maternity allowance). <br /> 9.2.3 Birth of
                  baby. When leave starts. <br /> 9.2.4 Employment rights <br />
                  9.2.5 Eligibility <br />
                  9.2.6 Proof of pregnancy <br /> 9.2.7 Notice period <br />{" "}
                  9.2.8 Returning to work <br /> 9.2.9 Dismissal etc <br />
                  9.2.10 Resignation while pregnant. <br />
                  9.2.11 Keep in touch days <br /> 9.2.12 Refuse pay form SMP1{" "}
                  <br />
                  9.2.13 Record keeping <br />
                  9.3 Paternity Leave <br />
                  9.3.1 Leave entitlement <br /> 9.3.2 Pay entitlement <br />
                  9.3.3 Eligibility <br /> 9.3.4 Claiming the benefits <br />{" "}
                  9.3.5 Adoption and surrogacy <br /> 9.4 Unpaid Carers’ Leave
                </span>
              </b>
              <br /> <br />
              <b>10 Network policy</b>
              <br /> <br />
              <b>11 Company dating policy</b>
              <br /> <br />
              <b>
                12 Grievance and disciplinary policy
                <br /> <br />
                <span className="conscentText-style">
                  12.1 Grievance procedure <br /> 12.2 Disciplinary procedure{" "}
                  <br /> 12.3 Misconduct <br /> 12.4 Responsibility for
                  Disciplinary Action <br /> 12.5 Principles of Disciplinary
                  Procedure <br /> 12.6 Disciplinary Levels of Action <br />{" "}
                  12.7 Conduct of disciplinary hearings <br /> 12.8 Appeals
                  procedure <br /> 12.9 Conduct of Appeals <br /> 12.10
                  Personnel file <br /> 12.11 Gross Misconduct Investigation
                  Procedure
                </span>
              </b>
              <br /> <br />
              <b>13 Remuneration, Bonus and Commission Policy</b>
              <br /> <br />
              <b>
                14 Safeguarding of Company Information and Assets Policy
                <br /> <br />
                <span className="conscentText-style">
                  14.1 Purpose <br /> 14.2 Company Property <br /> 14.3
                  Confidential and Proprietary Information <br /> 14.4 What
                  constitutes confidential information? <br /> 14.5 What
                  constitutes proprietary information? <br /> 14.6 Client
                  information <br /> 14.7 Data security <br /> 14.8 Workplace
                  Monitoring and Searches <br /> 14.9 Internet usage policy{" "}
                  <br /> 14.10 Duration of obligations
                </span>
              </b>
              <br /> <br />
              <b>
                15 Company laptop and hardware policy
                <br /> <br />
                <span className="conscentText-style">
                  15.1 Purpose <br /> 15.2 Eligibility <br /> 15.3 Process for
                  obtaining laptop <br /> 15.4 Configuration <br /> 15.5
                  Procurement Maintenance <br />
                  15.6 Backup <br /> 15.7 Termination of service <br /> 15.8
                  Laptop usage and security <br /> 15.9 Reporting loss or damage{" "}
                  <br /> 15.10 Installation of Unauthorised Software
                </span>
              </b>
              <br /> <br />
              <b>
                16 Expenses Policy
                <br /> <br />
                <span className="conscentText-style">
                  16.1 Purpose <br /> 16.2 Scope <br />
                  16.3 Food expenses <br /> 16.4 Travel arrangements <br /> 16.5
                  Continuing Professional Development Expenses
                </span>
              </b>
              <br /> <br />
              <b>
                17 Health and Safety Policy
                <br /> <br />
                <span className="conscentText-style">
                  17.1 Purpose <br /> 17.2 General Policy <br /> 17.3
                  Expectations <br /> 17.4 Safety Rules <br /> 17.5 First Aid{" "}
                  <br /> 17.6 Accident Investigation <br /> 17.7 Alcohol and
                  Drug Policy
                </span>
              </b>
              <br /> <br />
              <b>
                18 Sexual Harassment Policy
                <br /> <br />
                <span className="conscentText-style">
                  18.1 Definition <br /> 18.2 Reporting
                </span>
              </b>
              <br /> <br />
              <b>
                19 Miscellaneous
                <br /> <br />
                <span className="conscentText-style">
                  19.1 Joining formalities <br /> 19.2 Visa Policy <br /> 19.3
                  Severability <br /> 19.4 Jurisdiction  
                </span>
              </b>
              <br /> <br />
            </h6>
          </span>
          <span>
            <b>
              This EMPLOYEE HANDBOOK forms part of the contract of employment
              for all EMPLOYEES (“you”, “your”, “their”) of the COMPANY – “UAPP”
              (“we”, “us”). The following are deemed to apply and to have been
              read and agreed by each Employee:
            </b>
          </span>
          <br />
          <br />
          <h5 className="mb-3">
            <b className="bg-u">1. GENERAL</b>{" "}
          </h5>
          <span className="conscentText-style">
            Employees will work from one of the global offices, per their
            contract. An employee may within reason be required to travel to
            different cities to work.{" "}
          </span>
          <br />
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>1.1 Whole Time Service</b>
            </h6>
            During the time of your employment at UAPP, you will not engage
            directly or indirectly by any means or through any agency, in any
            work, business, profession, or employment whether paid or otherwise,
            without obtaining prior written permission from the Senior
            Management Team (SMT).
          </span>
          <br />
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>1.2 Duties</b>
            </h6>
            The duties of each employee will be assigned and or changed by SMT.
          </span>
          <br />
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>1.3 Penalty for failure to comply with rules</b>
            </h6>
            Failure to carry out duties or comply with this Agreement may result
            in disciplinary action and or recourse to civil or criminal law
            depending on the circumstances and as set out in the specific
            procedures below.
          </span>
          <br />
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>1.4 Whistleblowing</b>{" "}
            </h6>
            Employees are encouraged to report suspected breaches of any part of
            this Handbook including, but not limited to the policies against
            Discrimination, Sexual Harassment, Charging a Fee and Bribery and
            those supporting fair conduct of hearings, Health and Safety at Work
            and Confidentiality. Such reports should be made to the immediate
            manager or if the report is about the immediate manager, to a member
            of (SMT) including the head of legal and compliance.
          </span>
          <br />
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>1.5 Public Interest Disclosure Act</b>{" "}
            </h6>
            Employees are protected by the Public Interest Disclosure Act 1998;
            reports to the SMT of the matters set out in 1.4 above will be
            treated as examples of qualifying disclosure for the purposes of
            that Act and the Employment Rights Act 1996 as amended.
          </span>
          <br />
          <br />
          <h5 className="mb-3">
            <b className="bg-u">
              2. CONFIDENTIALITY OF RESOURCES AND INFORMATION
            </b>{" "}
          </h5>
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>2.1 Copyrights, Research and Discoveries</b>
            </h6>
            The copyright in and all rights over research work, data, patents,
            discoveries, articles, blog post and all else that an employee may
            make and or obtain during their employment with UAPP, shall vest and
            or remain in the Company.
          </span>
          <br />
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>2.2 Confidentiality</b>
            </h6>
            You will not reveal, whether during or after ceasing employment with
            the Company, to any individual or organization, by word of mouth or
            otherwise, any particulars, know-how, procedures, process or any
            other technical, administrative, financial, operational or any
            organizational information obtained while in the employment of UAPP.
          </span>
          <br />
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>2.3 Bribery Act 2010</b>
            </h6>
            Any actual or reasonable suspicion of breach of the Bribery Act 2010
            including bribing, being bribed or bribing of a public official,
            will result in disciplinary proceedings as per the Disciplinary
            Policy (13).
          </span>
          <br />
          <br />
          <h5 className="mb-3">
            <b className="bg-u">3. EMPLOYMENT AS “TRAINEE” OR “INTERN”</b>{" "}
          </h5>
          <span className="conscentText-style">
            Interns are paid or unpaid students from university on short
            contracts to gain experience. Trainees are employees who are in
            their probationary period learning the skills needed with a view to
            long-term employment.
          </span>{" "}
          <br />
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>3.1 Employment Status and Termination</b>
            </h6>
            As a “trainee” / “intern”, your services shall be treated as
            “probationary” for 3 months and can be terminated by UAPP at any
            time without reason. The notice period to be served based on the
            time served by the “intern” / “trainee” from the start of
            employment, is given as below:
          </span>
          <br />
          <br />
          <Table bordered>
            <thead>
              <tr className="text-center">
                <td>Period of Service</td>
                <td>Notice Period</td>
              </tr>
            </thead>
            <tbody>
              {" "}
              <tr className="text-center">
                <td>Under 1 month </td>
                <td>Nil</td>
              </tr>
              <tr className="text-center">
                <td>
                  1 month up to successful completion of probationary period
                </td>
                <td>1 Week</td>
              </tr>
            </tbody>
          </Table>
          This decision rests entirely with UAPP and the decision of the company
          shall be final and binding in all respects.
          <br />
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>3.2 Stipends, Commission Payments and Bonuses</b>
            </h6>
            You may be paid a monthly stipend by UAPP per your offer letter. You
            will also be entitled a commission, based on your performance, and
            will be paid as indicated on the offer letter and provided the terms
            and conditions of the commission are met. The decisions made by UAPP
            with respect to stipend and commission payment will be final.
            Interns and probationary Trainees are not entitled to bonus
            payments.
          </span>
          <br />
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>3.3 Exit Process for “Trainee”/ “Intern”</b>
            </h6>
            The Trainee must give one week’s notice in writing. The Company may
            choose to accept a shorter notice period.
          </span>
          <br />
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>3.3.1</b>{" "}
              <span className="conscentText-style">
                All confidentiality guidelines apply during the Exit process and
                notice period, and the “trainee” / “intern” is required to
                submit all work-related documents to their direct manager. If
                the “trainee” / “intern” fails to produce the required
                work-related documents, the “trainee” / “intern” agrees that the
                Company will suffer loss and damage resulting in a claim against
                any outstanding stipend.
              </span>
            </h6>
          </span>
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>3.4 Failure to serve Notice</b>
            </h6>
            Failure to give the required notice may result in the Company
            suffering loss and damage which will be claimed against the intern.
          </span>
          <br />
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>3.5 Conversion to Permanent role </b>
            </h6>
            UAPP will review your performance and if approved you will be
            eligible to apply for the company’s vacancies and may be given a
            full-time/part-time contract.
          </span>
          <br />
          <br />
          <h5 className="mb-3">
            {" "}
            <b className="bg-u">4. TERMINATION OF SERVICE</b>{" "}
          </h5>
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>4.1 Resignation</b>
            </h6>
            <span className="conscentText-style">
              <span className="conscentText-style">
                Employees will work from one of the global offices, per their
                contract. An employee may within reason be required to travel to
                different cities to work.{" "}
              </span>
              <br />
              <br />
              <Table bordered>
                <thead>
                  <tr className="text-center">
                    <td>Period of Service</td>
                    <td>Notice Period</td>
                  </tr>
                </thead>
                <tbody>
                  {" "}
                  <tr className="text-center">
                    <td>Under 1 month </td>
                    <td>1 week</td>
                  </tr>
                  <tr className="text-center">
                    <td>
                      1 month up to successful completion of probationary period
                    </td>
                    <td>1 Week</td>
                  </tr>
                  <tr className="text-center">
                    <td>
                      Successful completion of probation period but less than 1
                      year of service
                    </td>
                    <td>1 Week</td>
                  </tr>
                </tbody>
              </Table>
              You will be held responsible for all fees, expenses and any losses
              incurred by the company arising out of failure to submit all work
              and serve the notice period.
              <br />
              <br />
              confidential. UAPP will tell partners and clients about the
              resignation when it deems fit.
            </span>
          </span>
          <br />
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>4.2 Termination by Notice</b>
            </h6>
            Without prejudice to the above, the employment of an employee may be
            terminated at any time by the Company giving written notice. The
            notice period will depend on the time served by the employee from
            the date of employment. The notice period to be served is given
            below:
            <br />
            <br />
            <Table bordered>
              <thead>
                <tr className="text-center">
                  <td>Period of Service</td>
                  <td>Notice Period</td>
                </tr>
              </thead>
              <tbody>
                {" "}
                <tr className="text-center">
                  <td>Under 1 month </td>
                  <td>Nil</td>
                </tr>
                <tr className="text-center">
                  <td>
                    1 month up to successful completion of probationary period
                  </td>
                  <td>1 Week</td>
                </tr>
                <tr className="text-center">
                  <td>
                    Successful completion of probation period but less than 1
                    year of service
                  </td>
                  <td>4 Weeks</td>
                </tr>
                <tr className="text-center">
                  <td>1 year to less than 5 years of service</td>
                  <td>4 Weeks</td>
                </tr>
                <tr className="text-center">
                  <td>
                    5 years of service or more 1 week for each year served to a
                    maximum of
                  </td>
                  <td>12 weeks.</td>
                </tr>
              </tbody>
            </Table>
          </span>
          <br />
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>4.3 Termination due to Non-Performance</b>
            </h6>
            The contract of employment may also be terminated by reason of
            performance as per the disciplinary procedure below.
          </span>
          <br />
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>4.4 Liability of Employee after Termination </b>
            </h6>
            The employee will not, from the date of termination, represent
            themselves, either personally or by an agent indirectly as being in
            any way connected with or having any interest in, the company’s
            business. The Employee portal will be deactivated on the last day of
            the notice period to maintain confidentiality of information and the
            following will apply from that date:
            <br />
            <br />
            <ul>
              <li>
                You will not disclose any details of company’s clients, partners
                or employees to anybody or share any such information on public
                platforms, including social media channels.
              </li>
              <li>
                You will not have any contact with any of the company’s clients
                or partners for a period of 2 years in all the areas where UAPP
                is operating.
              </li>
              <li>
                You will keep confidential all information about the Company’s
                assets, including and not restricted to processes, operations
                and finances, client and partner lists and research projects.
              </li>
              <li>
                You will not apply to rejoin UAPP as an employee for a period of
                one year.
              </li>
              <li>
                You must not share information about the company’s database with
                anyone.{" "}
              </li>
              <li>
                Whenever the company so requests and or on termination, an
                employee must return all Company hardware to or as directed by
                SMT, without editing the existing data (including performing a
                complete or partial format).{" "}
              </li>
              <li>
                You agree not to attempt to access Company resources by
                approaching any of the colleagues still working in the Company.
              </li>
              <li>
                If any existing or previous client or partner of the Company
                contacts you, you must inform them that you have left and refer
                the contact to the Company.
              </li>
            </ul>
          </span>
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>4.5 Reference</b>
            </h6>
            A reference letter can be issued by the company to the former
            employee mentioning the last working date and period of employment.
            The additional content if any, of the reference letter, is not
            guaranteed.
          </span>
          <br />
          <br />
          <h5 className="mb-3">
            {" "}
            <b className="bg-u">5. RETIREMENT</b>{" "}
          </h5>
          <span className="conscentText-style">
            You will normally retire at the age as per the law in your own
            country. The Company may at its discretion enter into a specific
            agreement with you to extend your employment.
          </span>
          <br />
          <br />
          <h5 className="mb-3">
            {" "}
            <b className="bg-u">6. PERFORMANCE and SALARY APPRAISALS</b>{" "}
          </h5>
          <span className="conscentText-style">
            Salary appraisals are carried out at the discretion of UAPP.
            Employees must not disclose the following information with their
            colleagues:
            <ul>
              <li>Salaries</li>
              <li>Increments / Appraisal Details</li>
            </ul>
            Any increments will be as soon as practicable and usually in the
            month subsequent to the appraisal.
          </span>
          <br />
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>6.1 Factors of Appraisal and Performance Review</b>
            </h6>
            The outcome of the appraisal will be influenced by many factors
            including the following:
            <ul>
              <li>Performance evaluation</li>
              <li>Time keeping for work and breaks</li>
              <li>Client management </li>
              <li>Attention to Confidentiality </li>
              <li>Social behaviour and discipline </li>
              <li>Response time </li>
              <li>Commitment </li>
            </ul>
          </span>
          <br />
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>6.2 Conduct</b>
            </h6>
            Every employee must maintain complete decorum and discipline in the
            office and while working remotely with teams, colleagues, clients or
            partners. <br />
            <br /> Employees must not use office working hours in scrolling on
            social media platforms, playing online or PC games, listening to
            music, watching online videos or movies, viewing or downloading any
            adult material, trading on stock exchange sites or gambling.
          </span>
          <br />
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>6.3 Dress Code</b>
            </h6>
            Since each of us is a representative of the company, employees must
            pay attention to personal grooming and adhere to the recommended
            smart casual dress code while working onsite from the office or
            remotely from home. Slippers and floaters will not be allowed in the
            office.
          </span>
          <br />
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>6.4 Communication Ethics</b>
            </h6>
            Employees are encouraged to take ownership of projects and make the
            communication flow as easy and accurate as possible. Teamwork is
            always encouraged.
            <br /> All employees must check emails at least twice over a weekend
            and acknowledge urgent messages or those from clients or partners.{" "}
            <br />
            Employees are encouraged to call their seniors and colleagues by
            First Name only.
          </span>
          <br />
          <br />
          <h5 className="mb-3">
            {" "}
            <b className="bg-u">7. WORKING HOURS</b>{" "}
          </h5>
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>7.1 Office Timings and Breaks</b>
            </h6>
            The office is open from Monday to Friday between 10:00 AM to 6:00 PM
            GMT. Full-time and Part-Time employees (trainees / interns) are
            required to work according to their contract. <br />
            <br /> While working from home, employees should inform their
            immediate manager when they begin their day. Failure to do so during
            the first 15 minutes of work shall be considered as the employee
            taking unpaid leave for that day in the absence of SMT approval.{" "}
            <br />
            <br /> When working onsite, every employee will mark attendance on
            the biometrics log. An employee must inform their manager about any
            attendance issue as soon as possible. <br />
            <br /> Working hours may be extended based on the requirement of the
            task or project. Saturday will usually be a day off, but employees
            may be required to work from home if the client or partner requires
            some tasks to be completed. <br />
            <br /> Full time employees have a 1-hour lunch break per day and
            reasonable tea breaks during their working hours.
          </span>
          <br />
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>7.2 Overtime</b>
            </h6>
            If an employee is required to work after office hours or on holidays
            or weekends, additional pay will be agreed in advance.
          </span>
          <br />
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>7.3 Work from Home (WFH)</b>
            </h6>
            While the employees will generally be required to work onsite from
            the office, UAPP will give some flexibility to work from home (WFH)
            if necessary. Any request should be made to the immediate manager
            whose decision will be final.
          </span>
          <br />
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>7.4</b>{" "}
              <span className="conscentText-style">
                A summary e-mail should be sent daily by the employee to their
                immediate manager containing the following:
                <ul>
                  <li> Tasks assigned</li>
                  <li> Tasks Performed</li>
                  <li> Hourly task details / description</li>
                  <li> Total Working Hours</li>
                  <li> Backlog tasks (if any)</li>
                </ul>
                If the employee fails to do so by the end of the day, it will be
                considered a day of unpaid leave for the employee.
              </span>
            </h6>
          </span>
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>7.5 </b>{" "}
              <span className="conscentText-style">
                Employees given approval for WFH must:
                <ul>
                  <li> Have backup hardware.</li>
                  <li>Respond promptly.</li>
                  <li>
                    Be online on all communication channels from 10:00 AM.
                  </li>
                  <li>
                    Attend the daily client / partner calls, and team calls.
                  </li>
                  <li>
                    Communicate with their immediate manager throughout the day
                    on updates and tasks in hand
                  </li>
                </ul>
              </span>
            </h6>
          </span>
          <br />
          <br />
          <h5 className="mb-3">
            {" "}
            <b className="bg-u">8. CLIENT SERVICE POLICY</b>{" "}
          </h5>
          <span className="conscentText-style">
            All employees are required to follow these policies in order to
            increase the reputation of UAPP amongst potential students and
            academic partners.
          </span>
          <br />
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>8.1 No-Fee Policy</b>
            </h6>
            UAPP has a no-fee policy for clients seeking consultation services.
            This policy is in place to ensure transparency, fairness, and to
            uphold the integrity of the services provided. <br />
            <br />
            All UAPP employees are prohibited from charging clients any fees or
            non-monetary charges, directly or indirectly, for consultation
            services. <br />
            <br />
            Employees must clearly communicate the no-fee policy to clients at
            the onset of the consultation process. Employees must maintain
            accurate and detailed records of client interactions, clearly
            indicating the communication of the no-fee policy and ensuring that
            clients are fully aware of UAPP's commitment to this policy. <br />
            <br />
            Employees found in violation of the no-fee policy shall be
            personally liable to repay any sums received as a result.
          </span>
          <br />
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>8.2 Data Protection</b>
            </h6>{" "}
            UAPP protects the privacy and confidentiality of client information.
            This policy underscores the organization's unwavering commitment to
            safeguarding client data from any form of breach or unauthorized
            use. <br />
            <br />
            Employees are prohibited from attempting unauthorized access to
            client’s login portals, systems, or any electronic repositories
            housing client information. <br />
            <br />
            Client information is to be used solely for the purpose of providing
            university consultation and admission services. <br />
            <br />
            Any suspected or confirmed privacy breaches must be reported
            immediately to the designated supervisor or compliance officer.
          </span>
          <br />
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>8.3 Misleading Information</b>
            </h6>{" "}
            UAPP places great importance on transparency and honesty in all
            client interactions. This policy establishes guidelines to ensure
            that information provided during consultation and marketing
            activities is accurate, truthful and devoid of any misleading
            elements. <br />
            <br /> Employees must provide accurate and factual information to
            clients. Any representation of services, universities, or processes
            must be truthful and not exaggerate potential outcomes.
            Communication with clients must be clear and unambiguous.
            Information about study programs, application procedures, and
            associated costs must be presented in a manner that avoids confusion
            and provides clients with a comprehensive understanding. <br />
            <br />
            Employees must not make false claims about UAPP's services,
            partnerships, or success rates. <br />
            <br /> All marketing materials, must adhere to established
            advertising standards. Any deviation from ethical advertising
            practices, including misleading visuals or content, is strictly
            prohibited. <br />
            <br /> All marketing material, including but not limited to
            brochures, website content, and social media posts, must undergo an
            approval process to ensure compliance with this policy. Only
            approved and accurate content may be disseminated to clients. <br />
            <br />
            Employees engaged in marketing shall only use the templates provided
            by the UAPP marketing team, subject only to appropriate
            personalization, in order to market the services of UAPP and reach
            the target community. UAPP will monitor external communications,
            including social media accounts of employees, to ensure that
            representations and statements align with the organization's
            commitment to accurate and transparent information.
          </span>
          <br />
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>8.4 Conflict of Interest</b>
            </h6>{" "}
            A conflict of interest arises when an employee's personal interests
            or activities could influence, or be reasonably perceived by an
            impartial observer to have the potential to influence, the objective
            and unbiased nature of their professional duties at UAPP. <br />
            <br />
            All employees must disclose any potential or actual conflicts of
            interest. Examples of situations that may constitute a conflict of
            interest include, but are not limited to, financial interests,
            personal relationships, or affiliations that could influence the
            objectivity of advice or recommendations provided to clients. <br />
            <br />
            Disclosures of conflicts of interest will be reported to SMT for
            review and appropriate action. <br />
            <br />
            Concealment of actual or potential conflicts of interest is
            considered a serious violation of this policy and may result in
            disciplinary actions.
          </span>
          <br />
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>8.5 Client poaching</b>
            </h6>{" "}
            Employees are strictly prohibited from directly or indirectly
            soliciting UAPP's clients for personal gain or diverting them to
            alternative service providers. This includes any attempt to
            encourage clients to seek services outside the scope of UAPP. <br />
            <br />
            Employees must not engage in any activities that might compete with
            or undermine the interests of UAPP regardless of whether the
            employee stands to profit or not.
          </span>
          <br />
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>8.6 Social Media Usage Policy </b>
            </h6>{" "}
            UAPP recognizes the impact of social media on its reputation and
            client relations. This policy outlines guidelines to ensure
            responsible and ethical use of social media platforms by employees.{" "}
            <br />
            <br />
            Employees are expected to conduct themselves professionally on
            social media platforms. This includes refraining from engaging in
            any behaviour that could negatively impact UAPP's image or the trust
            of its clients. When identifying themselves as UAPP employees,
            individuals must be mindful of the organization's values and ethical
            standards. Any content shared or actions taken on social media
            should align with UAPP's professional image. <br />
            <br />
            Employees must respect the confidentiality and privacy of UAPP's
            clients, partners, and internal matters. Sharing confidential
            information or client details on social media platforms is strictly
            prohibited. <br />
            <br />
            Employees must avoid sharing misleading information about UAPP's
            services, achievements, or partnerships on social media. All
            representations must be accurate and in line with the organization's
            official communication. <br />
            <br />
            Employees must maintain separate personal and professional social
            media accounts. Content shared on personal accounts should not
            negatively impact the professional reputation of UAPP. Posting
            defamatory, offensive, or inappropriate content that could harm
            UAPP's reputation with its partners and or clients is strictly
            prohibited. <br />
            <br />
            Employees must obtain prior written approval before using any
            official UAPP materials on social media. Employees must refrain from
            connecting with UAPP's clients on personal social media accounts
            without explicit consent. Maintaining professional boundaries is
            crucial to protect client privacy.
          </span>
          <br />
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>8.7 Communication Standards </b>
            </h6>{" "}
            UAPP places a high value on effective communication to ensure
            clarity, transparency, and client satisfaction. Employees are
            expected to communicate in a timely and transparent manner with
            clients, colleagues, and relevant stakeholders. Delays in
            communication or lack of transparency may negatively impact UAPP's
            reputation and client relations. <br />
            <br />
            All written communication, including emails, reports, and official
            documents, must adhere to professional standards. Employees should
            avoid the use of unprofessional language, abbreviations, or any
            content that may be construed as disrespectful. <br />
            <br />
            Once employees initiate communication with a client, they should
            maintain continuous and consistent contact throughout the duration
            of the engagement. Dropping out of communication without valid
            reasons may negatively impact client relations and is strictly
            prohibited. If, for any reason, an employee anticipates challenges
            in maintaining regular communication, they should inform the client
            promptly and provide an alternative point of contact within UAPP.
            This ensures transparency and mitigates any potential disruptions in
            communication. <br />
            <br />
            Employees must prioritise and promptly respond to client inquiries,
            messages, and requests for information. Timely responsiveness is
            crucial to maintaining positive client relationships. Where clients
            express concerns or dissatisfaction, employees must acknowledge
            these concerns promptly and work towards resolving the issues in a
            professional and empathetic manner in accordance to the compliance
            procedures. <br />
            <br />
            Effective communication extends to collaboration within the team.
            Employees are expected to communicate clearly with colleagues, share
            relevant information, and contribute to a collaborative and
            supportive work environment. <br />
            <br />
            Employees encountering challenges in communication, whether internal
            or external, are encouraged to escalate the issues to the
            appropriate supervisor or manager promptly. Timely resolution is
            essential to maintain smooth operations.
          </span>
          <br />
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>8.8 False Documentation </b>
            </h6>{" "}
            Employees, whether by themselves or engaging, or seeking the
            assistance of, third parties, must not generate fraudulent
            documentation for any purpose, including but not limited to
            applications, qualifications, or any materials intended to deceive
            clients, universities, or authorities, nor recklessly rely upon or
            propound documents which an impartial observer would suspect of
            being false
          </span>
          <br />
          <br />
          <h5 className="mb-3">
            {" "}
            <b className="bg-u">9. HOLIDAYS</b>{" "}
          </h5>
          <span className="conscentText-style">
            Employees are entitled to Paid holidays and Maternity or Paternity
            Leave.
          </span>
          <br />
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>9.1 Paid Holidays</b>
            </h6>
            <ul>
              <li>
                The annual paid holidays cycle begins on 1st January and ends on
                31st December.{" "}
              </li>
              <li> Paid holidays are accumulated on a pro-rata basis. </li>
              <li>
                Every employee is entitled to 5.6 weeks of paid holidays in a
                year, including Bank Holidays.{" "}
              </li>
              <li>
                Unused Paid holidays may not be carried forward to the
                subsequent year.
              </li>
              <li>
                Paid holiday may be used to cover all or part of the notice
                period subject to approval for business reasons.
              </li>
              <li>
                The Company may insist that an employee use all or some of their
                remaining holiday entitlement during the notice period, upon
                giving appropriate notice (twice the length of the holiday in
                question.)
              </li>
              <li>
                Employees should book paid holidays at least 3 weeks in advance
                and seek approval from their immediate manager.
              </li>
              <li>Any unapproved holidays will be counted as unpaid leave. </li>
            </ul>
          </span>
          <br />
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>9.2 Maternity Leave</b>
            </h6>
          </span>
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>9.2.1 Leave Entitlement</b>
            </h6>
            All pregnant female employees are eligible to apply for Maternity
            Leave according to criteria laid down by government from time to
            time. The maximum period for which any employee is entitled to
            maternity benefit shall be 52 weeks. <br />
            <br />
            There are 3 main types of maternity leave to which an employee may
            be entitled: <br />
            <ul>
              <li>
                {" "}
                Compulsory Maternity Leave (CML) This must be taken by all new
                mothers for the 2 weeks following the birth of their child.
              </li>
              <li>
                {" "}
                Ordinary Maternity Leave (OML) This covers the first 26 weeks of
                maternity leave, pre-birth. After this end, you can return to
                your job exactly as before.
              </li>
              <li>
                {" "}
                Additional Maternity Leave (AML) This refers to the remaining 26
                weeks that follow your OML (which in total make up the full 52
                weeks to which an employee is entitled).
              </li>
            </ul>
          </span>
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>9.2.2 Payment Entitlement</b>
            </h6>
            Employees may be entitled to claim three types of maternity pay
            subject to criteria laid down by government from time to time.{" "}
            <br />
            <ul>
              <li>
                {" "}
                Statutory Maternity Pay (SMP) is the most common type of pay.
                For the first 6 weeks, a SMP equivalent to 90% of the employee’s
                average weekly earnings is paid. For the following 33 weeks, SMP
                is paid at the applicable statutory level. SMP is payable for 39
                weeks, as long as you have been employed by UAPP for a
                continuous period of 26 weeks when the qualifying week starts.
                The qualifying week is 15 weeks before the Expected Week of
                Childbirth (EWC).
              </li>
              <li>
                {" "}
                Occupational Maternity Pay (OMP) is a payment made at the
                discretion of SMT in addition to the SMP. The payment of OMP
                will have different terms and conditions which will be discussed
                by the senior management with the employee in any case where
                such a decision to make such a payment is made
              </li>
              <li>
                {" "}
                Maternity Allowance (MA) is a state benefit which an employee
                can only receive if the employee does not qualify for SMP. In
                order to qualify for MA, an employee should be employed for at
                least 26 weeks out of the preceding the EWC.
              </li>
              <li>
                The payment schedule for maternity pay will depend on the type
                of payment to which an employee is entitled. SMP and OMP
                typically occur as weekly payments, while MA is paid every 2 or
                4 weeks. The earliest an employee can start their SMP is 11
                weeks before the Expected Week of Childbirth (EWC). However, if
                the employee is off sick with a pregnancy related illness in the
                4 weeks before EWC, their SMP will start on the day after first
                day of absence from work. If a baby is born early, the maternity
                leave and SMP or MA will start on the day after the birth.
              </li>
            </ul>
          </span>
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>9.2.3 Birth of the baby</b>
            </h6>
            The leave starts the day after the birth if baby is born early. The
            employee must provide UAPP with the child’s birth certificate or a
            document signed by a doctor or midwife that confirms the actual date
            of birth. The employee must also confirm the new end date for their
            leave. For every premature birth where the child is born 15 weeks or
            more before the due date, employee’s SMP will be calculated
            differently. <br />
            <br />
            In such unfortunate cases, the employee may still be qualified for
            leave or pay if the baby:
            <ul>
              <li>
                {" "}
                Is still born after the start of the 24th week of pregnancy or
              </li>
              <li> Dies after being born</li>
            </ul>
          </span>
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>9.2.4 Employment rights</b>
            </h6>
            Employee rights are not affected by the taking of maternity leave.
            Some employees can work up to 10 paid days during their leave. The
            employment terms and conditions are protected and employees are
            entitled to any pay rises and improvements in terms and conditions
            given during the leave.
          </span>
          <br />
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>9.2.4.1</b>{" "}
              <span className="conscentText-style">
                Pension contributions usually stop if a period of leave is
                unpaid, unless the contract says otherwise. Employees continue
                to build up holiday entitlement and can take any holiday they
                have accrued before or after the leave in accordance with UAPP’s
                policies.{" "}
              </span>
            </h6>
          </span>
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>9.2.5 Eligibility</b>
            </h6>
            Some employees will not qualify for both maternity leave and
            maternity pay.
            <br />
            <br />
            In order to receive Statutory Maternity Leave, employees must:
            <ul>
              <li>Have an employment contract </li>
              <li>Give written notice of the appropriate length </li>
            </ul>
            In order to receive Statutory Maternity Pay (SMP), employees must:
            <ul>
              <li>
                Be on UAPP’s payroll in the ‘qualifying week’ – 15th week before
                the Expected Week of Childbirth
              </li>
              <li> Give written notice of appropriate length</li>
              <li> Provide a proof of pregnancy</li>
              <li>
                Be continuously employed by UAPP for at least 26 weeks up to any
                day in the qualifying week
              </li>
              <li>
                Earn at least £123 per week (gross average) in an 8-week
                relevant period
              </li>
            </ul>
          </span>
          <br />
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>9.2.6 Proof of Pregnancy</b>
            </h6>
            An employee must provide proof of pregnancy UAPP to receive SMP.
            This is usually a doctor’s letter or a maternity certificate (known
            as MATB1 certificate). Midwives and doctors usually issue these 20
            weeks before the due date. <br />
            <br />
            The employee can provide proof of pregnancy within 21 days of the
            SMP start date. Acceptance of proof of pregnancy at any date later
            the above-mentioned period is at the discretion of UAPP. UAPP will
            not pay SMP if it does not receive proof of the due date 13 weeks
            after the SMP start date. UAPP will keep the record of the proof of
            pregnancy. If an employee is not entitled to SMP, they can apply for
            Maternity Allowance instead.
          </span>
          <br />
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>9.2.7 Notice Period</b>
            </h6>
            The employee must give notice at least 15 weeks before the Expected
            Week of Childbirth (EWC) in order to qualify for maternity leave.
            The employee should provide the following information to their
            immediate manager: <br />
            <ul>
              <li> That employee is pregnant</li>
              <li>
                Expected Week of Childbirth (with a copy Maternity Certificate)
              </li>
              <li>The date on which it is intended to start maternity leave</li>
            </ul>
            An employee who gives UAPP the above information will have the right
            to paid time off to attend ante-natal appointments. If the employee
            wants to change the start of their maternity leave (it is also
            usually the date when the SMP starts), they must give UAPP notice of
            the new date at least 28 days before the new or old date (whichever
            is earliest). UAPP can refuse to pay SMP if the employee fails to
            give prior notice as mentioned above without a reasonable excuse.
            <br />
            <br />
            Employees can change their return-to-work date if they give 8 weeks’
            notice.
          </span>
          <br />
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>9.2.8 Returning to Work</b>
            </h6>
            Employees have the right to return to their job if they take: <br />
            <ul>
              <li> Only 26 weeks of Maternity or Adoption leave</li>
              <li>
                Only 26 weeks of Shared Parental Leave (between both Parents)
              </li>
              <li> 4 weeks or less of unpaid Parental Leave</li>
              <li> Parental Bereavement Leave</li>
            </ul>
            If an employee takes more leave, they will have the right to a
            similar job (if it is not possible to give them their old job).
            “Similar” means the job has same or better terms and conditions. If
            the employee unreasonably refuses to accept the similar job, then
            UAPP can take this as an offer of resignation..
          </span>
          <br />
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>9.2.9 Dismissal, redundancy or end of fixed contract</b>
            </h6>
            As long as an employee was employed in part of the 15th week before
            the Expected Week of Childbirth (and they meet the qualifying
            conditions), the employee can still claim SMP. Once qualified, the
            employee is entitled to receive SMP for the full 39 weeks. <br />
            <br />
            If the employee is dismissed, made redundant or any employment
            contract ends before the 15th week before the baby was due, the
            employee will not qualify for SMP but may qualify for Maternity
            Allowance. <br />
            <br />
            If an employee has 2 or more employers, they can claim SMP from each
            one of them, provided that they satisfy the conditions for each job.
            The employee can also choose to take Maternity leave and SMP at
            different times for each job. The Keep in Touch Days will also apply
            to each job separately.
          </span>
          <br />
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>9.2.10 Resignation</b>
            </h6>
            To resign whilst pregnant, an employee should hand in the notice
            within the notice period required by UAPP. The employment will end
            on expiry of the notice period, but the employee will continue to
            receive the normal pay and benefits until they have stopped working.{" "}
            <br />
            <br />
            The employee will still be entitled to SMP if the job ends after the
            end of the 15th week before the baby us due (this would be roughly
            26th Week of pregnancy), given that employee meets all the
            qualifying conditions. If the job ends before the end of 15th week,
            the employee will not be entitled to SMP, but may be entitled to
            Maternity Allowance instead. <br />
            <br />
            If an employee resigns after having the baby, they will be entitled
            to receive SMP for the remaining 39 weeks (unless they start a new
            job) and they will be entitled to the usual contractual benefits
            such as annual leave, up to the end of notice period. In such a
            case, the employee does not have to return SMP, but will have to
            repay any Occupational Maternity Pay provided by UAPP as per the
            contract.
          </span>
          <br />
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>9.2.11 Keep in touch days</b>
            </h6>
            Employees can work up to 10 days during their maternity or adoption
            leave. These days are called Keeping in Touch Days (KIT). These are
            optional and require agreement of both employee and Company as to
            timing, nature of work and pay. The employee’s rights to maternity
            or adoption leave and pay are not affected by taking KIT days.{" "}
            <br />
            <br />
            Employees can work up to 20 days during their Shared Parental Leave.
            These are called ‘shared parental leave in touch’ (or SPLIT) days.
            These days are in addition to the 10 ‘keeping in touch’ (or KIT)
            days already available to employees on maternity or adoption leave.
          </span>
          <br />
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>9.2.12 Refuse Maternity Pay Form SMP1</b>
            </h6>
            UAPP can refuse Statutory Maternity Pay (SMP) if an employee does
            not qualify. In such a case, the employee may be able to apply for
            Maternity Allowance instead. If UAPP decides to not pay SMP due to a
            valid reason, the employee will be provided with a SMP1 form within
            7 days of the decision
          </span>
          <br />
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>9.2.13 Record Keeping</b>
            </h6>
            UAPP will keep records to comply with HMRC requirements, including:{" "}
            <br />
            <ul>
              <li>Proof of Pregnancy</li>
              <li> The date SMP began</li>
              <li> SMP Payments (including dates of payment)</li>
              <li> The SMP that employee has reclaimed</li>
              <li>Any weeks when the payment was not made (with reasons)</li>
            </ul>
            The records will be kept for 3 years from the end of the tax year to
            which these records relate or such other period as HMRC direct.
          </span>
          <br />
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>9.3 Paternity Leave</b>
            </h6>
            An employee is entitled to take time off if their partner is having
            a baby, adopting a child or having a baby through a surrogacy
            arrangement. <br />
            <br />
            The employee might be eligible for:
            <ul>
              <li> 1 or 2 weeks paid paternity leave</li>
              <li> Paternity Pay</li>
              <li> Shared Parental Leave and Pay</li>
            </ul>
            All employment rights are protected while on paternity leave. This
            includes:
            <ul>
              <li> Pay rises</li>
              <li> Build up (accrue) holiday</li>
              <li> Return to work</li>
            </ul>
            The employee may take time off to accompany their partner (or
            surrogate mother) to 2 ante-natal appointments. In the case of
            adoption, the employee may take time off to attend 2 adoption
            appointments after they have been matched with a child.
          </span>
          <br />
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>9.3.1 Leave Entitlement</b>
            </h6>
            For Paternity Leave, the employee can choose to take either 1 or 2
            weeks off. The employee will be entitled the same amount of leave if
            the partner has a multiple birth (such as twins). The leave should
            be taken in one go. The week is the same number of days that an
            employee normally works in a week (pro-rata). Leave cannot start
            before the birth and must end within 56 days of the birth (or due
            date, if the baby is early). The employee must inform the senior
            management of UAPP and give a 28 days’ notice if they want to change
            the start date. <br />
            <br />
            Employees may also be eligible for Shared Parental Leave (SPL) but
            cannot take Paternity Leave after taking SPL. The employee can take
            unpaid leave to accompany a pregnant woman to 2 antenatal
            appointments if the employee is:
            <ul>
              <li> The baby’s father</li>
              <li> The expectant mother’s spouse or civil partner</li>
              <li>In a long-term relationship with the expectant mother</li>
              <li>
                {" "}
                The intended parent (if employee is having baby through a
                surrogacy arrangement)
              </li>
            </ul>
            The Employee can take up to 6 and a half hours per appointment but
            UAPP can choose to give longer time period.
          </span>
          <br />
          <br />
          <span className="conscentText-style">
            <h6 className="mb-3">
              <b>9.3.2 Pay Entitlement</b>
            </h6>
            The employee is entitled to claim the statutory weekly rate of
            Paternity Pay from time to time from which Tax and National
            insurance will be deducted. The start and end date of the Paternity
            Pay need to be confirmed with the SMT. If the employee wants to
            change the start date, a notice of at least 28 days should be given
            to SMT.
          </span>
          <br />
          <br />
        </CardBody>
      </Card>
    </div>
  );
};

export default ConsultantNewDeclaration;
