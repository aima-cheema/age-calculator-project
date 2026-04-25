function calculateAge() {
  const dayVal   = parseInt(document.getElementById('day').value.trim());
  const monthVal = parseInt(document.getElementById('month').value.trim());
  const yearVal  = parseInt(document.getElementById('year').value.trim());
  const errorEl  = document.getElementById('error');

  errorEl.textContent = '';

  if (!dayVal || !monthVal || !yearVal) {
    errorEl.textContent = '⚠ Please fill in all three fields.';
    return;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (yearVal < 1900 || yearVal > today.getFullYear()) {
    errorEl.textContent = '⚠ Enter a valid year (1900 – ' + today.getFullYear() + ').';
    return;
  }
  if (monthVal < 1 || monthVal > 12) {
    errorEl.textContent = '⚠ Month must be between 1 and 12.';
    return;
  }

  const maxDay = new Date(yearVal, monthVal, 0).getDate();
  if (dayVal < 1 || dayVal > maxDay) {
    errorEl.textContent = `⚠ Day must be between 1 and ${maxDay} for that month.`;
    return;
  }

  const birthDate = new Date(yearVal, monthVal - 1, dayVal);
  if (birthDate > today) {
    errorEl.textContent = '⚠ Date of birth cannot be in the future.';
    return;
  }

  let years  = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth()    - birthDate.getMonth();
  let days   = today.getDate()     - birthDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const totalDaysLived = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));

  let nextBday = new Date(today.getFullYear(), monthVal - 1, dayVal);
  if (nextBday <= today) nextBday.setFullYear(nextBday.getFullYear() + 1);
  const daysUntilBday = Math.ceil((nextBday - today) / (1000 * 60 * 60 * 24));
  const isBirthdayToday = (today.getMonth() === birthDate.getMonth() && today.getDate() === birthDate.getDate());

  const months_short = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const nextBdayStr  = `${months_short[nextBday.getMonth()]} ${nextBday.getDate()}, ${nextBday.getFullYear()}`;
  const heartbeats   = (totalDaysLived * 24 * 60 * 70).toLocaleString();

  setWithPulse('years',  years);
  setWithPulse('months', months);
  setWithPulse('days',   days);

  document.getElementById('nextBday').textContent   = isBirthdayToday ? '🎉 Today!' : nextBdayStr;
  document.getElementById('daysLeft').textContent   = isBirthdayToday ? '0 — Happy Birthday! 🎂' : `${daysUntilBday} days`;
  document.getElementById('totalDays').textContent  = totalDaysLived.toLocaleString();
  document.getElementById('heartbeats').textContent = '~' + heartbeats;

  const section = document.getElementById('resultSection');
  section.classList.add('visible');
  setTimeout(() => section.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
}

function setWithPulse(id, value) {
  const el = document.getElementById(id);
  el.textContent = value;
  el.classList.remove('pulse');
  void el.offsetWidth;
  el.classList.add('pulse');
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') calculateAge();
});

document.getElementById('calcBtn').addEventListener('click', calculateAge);