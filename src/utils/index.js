import {DateTime, Interval} from 'luxon';

export const formatDOB = dt => {
  const date = DateTime.fromISO(dt);
  return date.isValid ? date.toLocaleString(DateTime.DATE_MED) : 'NA';
};

export const getJoiningDate = dt => {
  const date = DateTime.fromISO(dt);
  if (date.isValid) {
    let diffInDays = DateTime.fromISO(date).diffNow(['days']).toObject();
    diffInDays = Math.floor(Math.abs(diffInDays?.days));

    if (diffInDays < 7) return `${diffInDays} days ago`;
    else if (diffInDays > 7 && diffInDays <= 14) return '1 Weeks ago';
    else if (diffInDays < 30) return `${diffInDays} days ago`;
    return date.toLocaleString(DateTime.DATE_MED);
  }

  return 'NA';
};

export const getPdfContent = (data, dateJoined, dob) => {
  return `<html>
      <link
        href="http://netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap.min.css"
        rel="stylesheet"
        id="bootstrap-css"
      />
      <script src="http://netdna.bootstrapcdn.com/bootstrap/3.1.0/js/bootstrap.min.js"></script>
      <script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <div class="row">
              <img
                src="${data?.picture?.large}"
                alt="NA"
                style="width: 250px; height: 250px; margin-left: 18"
              />
            </div>
            <div class="row">
              <div class="col-xs-12">
                <strong>Age:</strong> ${data?.dob?.age}
              </div>
              <div class="col-xs-12">
                <strong>Email:</strong> ${data?.email}
              </div>
              <div class="col-xs-12">
                <strong>Date Joined:</strong> ${dateJoined}
              </div>
              <div class="col-xs-12">
                <strong>DOB:</strong> ${dob}
              </div>
            </div>
            <hr />

            <div class="row">
              <div class="col-xs-12">
                <strong>LOCATION</strong>
              </div>
              <hr />
            </div>
            <div class="row">
              <div class="col-xs-12">
                <strong>city:</strong> ${data?.location?.city}
              </div>
              <div class="col-xs-12">
                <strong>state:</strong> ${data?.location?.state}
              </div>
              <div class="col-xs-12">
                <strong>country:</strong> ${data?.location?.country}
              </div>
              <div class="col-xs-12">
                <strong>postcode:</strong> ${data?.location?.postcode}
              </div>
            </div>
          </div>
        </div>
      </div>
    </html>`;
};
