const countries = [
  { title: 'Afghanistan', value: 'AF-Afghanistan' },
  { title: 'Åland Islands', value: 'AX-Åland Islands' },
  { title: 'Albania', value: 'AL-Albania' },
  { title: 'Algeria', value: 'DZ-Algeria' },
  { title: 'American Samoa', value: 'AS-American Samoa' },
  { title: 'AndorrA', value: 'AD-AndorrA' },
  { title: 'Angola', value: 'AO-Angola' },
  { title: 'Anguilla', value: 'AI-Anguilla' },
  { title: 'Antarctica', value: 'AQ-Antarctica' },
  { title: 'Antigua and Barbuda', value: 'AG-Antigua and Barbuda' },
  { title: 'Argentina', value: 'AR-Argentina' },
  { title: 'Armenia', value: 'AM-Armenia' },
  { title: 'Aruba', value: 'AW-Aruba' },
  { title: 'Australia', value: 'AU-Australia' },
  { title: 'Austria', value: 'AT-Austria' },
  { title: 'Azerbaijan', value: 'AZ-Azerbaijan' },
  { title: 'Bahamas', value: 'BS-Bahamas' },
  { title: 'Bahrain', value: 'BH-Bahrain' },
  { title: 'Bangladesh', value: 'BD-Bangladesh' },
  { title: 'Barbados', value: 'BB-Barbados' },
  { title: 'Belarus', value: 'BY-Belarus' },
  { title: 'Belgium', value: 'BE-Belgium' },
  { title: 'Belize', value: 'BZ-Belize' },
  { title: 'Benin', value: 'BJ-Benin' },
  { title: 'Bermuda', value: 'BM-Bermuda' },
  { title: 'Bhutan', value: 'BT-Bhutan' },
  { title: 'Bolivia', value: 'BO-Bolivia' },
  { title: 'Bosnia and Herzegovina', value: 'BA-Bosnia and Herzegovina' },
  { title: 'Botswana', value: 'BW-Botswana' },
  { title: 'Bouvet Island', value: 'BV-Bouvet Island' },
  { title: 'Brazil', value: 'BR-Brazil' },
  {
    title: 'British Indian Ocean Territory',
    value: 'IO-British Indian Ocean Territory',
  },
  { title: 'Brunei Darussalam', value: 'BN-Brunei Darussalam' },
  { title: 'Bulgaria', value: 'BG-Bulgaria' },
  { title: 'Burkina Faso', value: 'BF-Burkina Faso' },
  { title: 'Burundi', value: 'BI-Burundi' },
  { title: 'Cambodia', value: 'KH-Cambodia' },
  { title: 'Cameroon', value: 'CM-Cameroon' },
  { title: 'Canada', value: 'CA-Canada' },
  { title: 'Cape Verde', value: 'CV-Cape Verde' },
  { title: 'Cayman Islands', value: 'KY-Cayman Islands' },
  { title: 'Central African Republic', value: 'CF-Central African Republic' },
  { title: 'Chad', value: 'TD-Chad' },
  { title: 'Chile', value: 'CL-Chile' },
  { title: 'China', value: 'CN-China' },
  { title: 'Christmas Island', value: 'CX-Christmas Island' },
  { title: 'Cocos (Keeling) Islands', value: 'CC-Cocos (Keeling) Islands' },
  { title: 'Colombia', value: 'CO-Colombia' },
  { title: 'Comoros', value: 'KM-Comoros' },
  { title: 'Congo', value: 'CG-Congo' },
  {
    title: 'Congo, The Democratic Republic of the',
    value: 'CD-Congo, The Democratic Republic of the',
  },
  { title: 'Cook Islands', value: 'CK-Cook Islands' },
  { title: 'Costa Rica', value: 'CR-Costa Rica' },
  { title: "Cote D'Ivoire", value: "CI-Cote D'Ivoire" },
  { title: 'Croatia', value: 'HR-Croatia' },
  { title: 'Cuba', value: 'CU-Cuba' },
  { title: 'Cyprus', value: 'CY-Cyprus' },
  { title: 'Czech Republic', value: 'CZ-Czech Republic' },
  { title: 'Denmark', value: 'DK-Denmark' },
  { title: 'Djibouti', value: 'DJ-Djibouti' },
  { title: 'Dominica', value: 'DM-Dominica' },
  { title: 'Dominican Republic', value: 'DO-Dominican Republic' },
  { title: 'Ecuador', value: 'EC-Ecuador' },
  { title: 'Egypt', value: 'EG-Egypt' },
  { title: 'El Salvador', value: 'SV-El Salvador' },
  { title: 'Equatorial Guinea', value: 'GQ-Equatorial Guinea' },
  { title: 'Eritrea', value: 'ER-Eritrea' },
  { title: 'Estonia', value: 'EE-Estonia' },
  { title: 'Ethiopia', value: 'ET-Ethiopia' },
  {
    title: 'Falkland Islands (Malvinas)',
    value: 'FK-Falkland Islands (Malvinas)',
  },
  { title: 'Faroe Islands', value: 'FO-Faroe Islands' },
  { title: 'Fiji', value: 'FJ-Fiji' },
  { title: 'Finland', value: 'FI-Finland' },
  { title: 'France', value: 'FR-France' },
  { title: 'French Guiana', value: 'GF-French Guiana' },
  { title: 'French Polynesia', value: 'PF-French Polynesia' },
  {
    title: 'French Southern Territories',
    value: 'TF-French Southern Territories',
  },
  { title: 'Gabon', value: 'GA-Gabon' },
  { title: 'Gambia', value: 'GM-Gambia' },
  { title: 'Georgia', value: 'GE-Georgia' },
  { title: 'Germany', value: 'DE-Germany' },
  { title: 'Ghana', value: 'GH-Ghana' },
  { title: 'Gibraltar', value: 'GI-Gibraltar' },
  { title: 'Greece', value: 'GR-Greece' },
  { title: 'Greenland', value: 'GL-Greenland' },
  { title: 'Grenada', value: 'GD-Grenada' },
  { title: 'Guadeloupe', value: 'GP-Guadeloupe' },
  { title: 'Guam', value: 'GU-Guam' },
  { title: 'Guatemala', value: 'GT-Guatemala' },
  { title: 'Guernsey', value: 'GG-Guernsey' },
  { title: 'Guinea', value: 'GN-Guinea' },
  { title: 'Guinea-Bissau', value: 'GW-Guinea-Bissau' },
  { title: 'Guyana', value: 'GY-Guyana' },
  { title: 'Haiti', value: 'HT-Haiti' },
  {
    title: 'Heard Island and Mcdonald Islands',
    value: 'HM-Heard Island and Mcdonald Islands',
  },
  {
    title: 'Holy See (Vatican City State)',
    value: 'VA-Holy See (Vatican City State)',
  },
  { title: 'Honduras', value: 'HN-Honduras' },
  { title: 'Hong Kong', value: 'HK-Hong Kong' },
  { title: 'Hungary', value: 'HU-Hungary' },
  { title: 'Iceland', value: 'IS-Iceland' },
  { title: 'India', value: 'IN-India' },
  { title: 'Indonesia', value: 'ID-Indonesia' },
  { title: 'Iran, Islamic Republic Of', value: 'IR-Iran, Islamic Republic Of' },
  { title: 'Iraq', value: 'IQ-Iraq' },
  { title: 'Ireland', value: 'IE-Ireland' },
  { title: 'Isle of Man', value: 'IM-Isle of Man' },
  { title: 'Israel', value: 'IL-Israel' },
  { title: 'Italy', value: 'IT-Italy' },
  { title: 'Jamaica', value: 'JM-Jamaica' },
  { title: 'Japan', value: 'JP-Japan' },
  { title: 'Jersey', value: 'JE-Jersey' },
  { title: 'Jordan', value: 'JO-Jordan' },
  { title: 'Kazakhstan', value: 'KZ-Kazakhstan' },
  { title: 'Kenya', value: 'KE-Kenya' },
  { title: 'Kiribati', value: 'KI-Kiribati' },
  {
    title: "Korea, Democratic People's Republic of",
    value: "KP-Korea, Democratic People's Republic of",
  },
  { title: 'Korea, Republic of', value: 'KR-Korea, Republic of' },
  { title: 'Kuwait', value: 'KW-Kuwait' },
  { title: 'Kyrgyzstan', value: 'KG-Kyrgyzstan' },
  {
    title: "Lao People's Democratic Republic",
    value: "LA-Lao People's Democratic Republic",
  },
  { title: 'Latvia', value: 'LV-Latvia' },
  { title: 'Lebanon', value: 'LB-Lebanon' },
  { title: 'Lesotho', value: 'LS-Lesotho' },
  { title: 'Liberia', value: 'LR-Liberia' },
  { title: 'Libyan Arab Jamahiriya', value: 'LY-Libyan Arab Jamahiriya' },
  { title: 'Liechtenstein', value: 'LI-Liechtenstein' },
  { title: 'Lithuania', value: 'LT-Lithuania' },
  { title: 'Luxembourg', value: 'LU-Luxembourg' },
  { title: 'Macao', value: 'MO-Macao' },
  {
    title: 'Macedonia, The Former Yugoslav Republic of',
    value: 'MK-Macedonia, The Former Yugoslav Republic of',
  },
  { title: 'Madagascar', value: 'MG-Madagascar' },
  { title: 'Malawi', value: 'MW-Malawi' },
  { title: 'Malaysia', value: 'MY-Malaysia' },
  { title: 'Maldives', value: 'MV-Maldives' },
  { title: 'Mali', value: 'ML-Mali' },
  { title: 'Malta', value: 'MT-Malta' },
  { title: 'Marshall Islands', value: 'MH-Marshall Islands' },
  { title: 'Martinique', value: 'MQ-Martinique' },
  { title: 'Mauritania', value: 'MR-Mauritania' },
  { title: 'Mauritius', value: 'MU-Mauritius' },
  { title: 'Mayotte', value: 'YT-Mayotte' },
  { title: 'Mexico', value: 'MX-Mexico' },
  {
    title: 'Micronesia, Federated States of',
    value: 'FM-Micronesia, Federated States of',
  },
  { title: 'Moldova, Republic of', value: 'MD-Moldova, Republic of' },
  { title: 'Monaco', value: 'MC-Monaco' },
  { title: 'Mongolia', value: 'MN-Mongolia' },
  { title: 'Montserrat', value: 'MS-Montserrat' },
  { title: 'Morocco', value: 'MA-Morocco' },
  { title: 'Mozambique', value: 'MZ-Mozambique' },
  { title: 'Myanmar', value: 'MM-Myanmar' },
  { title: 'Namibia', value: 'NA-Namibia' },
  { title: 'Nauru', value: 'NR-Nauru' },
  { title: 'Nepal', value: 'NP-Nepal' },
  { title: 'Netherlands', value: 'NL-Netherlands' },
  { title: 'Netherlands Antilles', value: 'AN-Netherlands Antilles' },
  { title: 'New Caledonia', value: 'NC-New Caledonia' },
  { title: 'New Zealand', value: 'NZ-New Zealand' },
  { title: 'Nicaragua', value: 'NI-Nicaragua' },
  { title: 'Niger', value: 'NE-Niger' },
  { title: 'Nigeria', value: 'NG-Nigeria' },
  { title: 'Niue', value: 'NU-Niue' },
  { title: 'Norfolk Island', value: 'NF-Norfolk Island' },
  { title: 'Northern Mariana Islands', value: 'MP-Northern Mariana Islands' },
  { title: 'Norway', value: 'NO-Norway' },
  { title: 'Oman', value: 'OM-Oman' },
  { title: 'Pakistan', value: 'PK-Pakistan' },
  { title: 'Palau', value: 'PW-Palau' },
  {
    title: 'Palestinian Territory, Occupied',
    value: 'PS-Palestinian Territory, Occupied',
  },
  { title: 'Panama', value: 'PA-Panama' },
  { title: 'Papua New Guinea', value: 'PG-Papua New Guinea' },
  { title: 'Paraguay', value: 'PY-Paraguay' },
  { title: 'Peru', value: 'PE-Peru' },
  { title: 'Philippines', value: 'PH-Philippines' },
  { title: 'Pitcairn', value: 'PN-Pitcairn' },
  { title: 'Poland', value: 'PL-Poland' },
  { title: 'Portugal', value: 'PT-Portugal' },
  { title: 'Puerto Rico', value: 'PR-Puerto Rico' },
  { title: 'Qatar', value: 'QA-Qatar' },
  { title: 'Reunion', value: 'RE-Reunion' },
  { title: 'Romania', value: 'RO-Romania' },
  { title: 'Russian Federation', value: 'RU-Russian Federation' },
  { title: 'Rwanda', value: 'RW-Rwanda' },
  { title: 'Saint Helena', value: 'SH-Saint Helena' },
  { title: 'Saint Kitts and Nevis', value: 'KN-Saint Kitts and Nevis' },
  { title: 'Saint Lucia', value: 'LC-Saint Lucia' },
  { title: 'Saint Pierre and Miquelon', value: 'PM-Saint Pierre and Miquelon' },
  {
    title: 'Saint Vincent and the Grenadines',
    value: 'VC-Saint Vincent and the Grenadines',
  },
  { title: 'Samoa', value: 'WS-Samoa' },
  { title: 'San Marino', value: 'SM-San Marino' },
  { title: 'Sao Tome and Principe', value: 'ST-Sao Tome and Principe' },
  { title: 'Saudi Arabia', value: 'SA-Saudi Arabia' },
  { title: 'Senegal', value: 'SN-Senegal' },
  { title: 'Serbia and Montenegro', value: 'CS-Serbia and Montenegro' },
  { title: 'Seychelles', value: 'SC-Seychelles' },
  { title: 'Sierra Leone', value: 'SL-Sierra Leone' },
  { title: 'Singapore', value: 'SG-Singapore' },
  { title: 'Slovakia', value: 'SK-Slovakia' },
  { title: 'Slovenia', value: 'SI-Slovenia' },
  { title: 'Solomon Islands', value: 'SB-Solomon Islands' },
  { title: 'Somalia', value: 'SO-Somalia' },
  { title: 'South Africa', value: 'ZA-South Africa' },
  {
    title: 'South Georgia and the South Sandwich Islands',
    value: 'GS-South Georgia and the South Sandwich Islands',
  },
  { title: 'Spain', value: 'ES-Spain' },
  { title: 'Sri Lanka', value: 'LK-Sri Lanka' },
  { title: 'Sudan', value: 'SD-Sudan' },
  { title: 'Suriname', value: 'SR-Suriname' },
  { title: 'Svalbard and Jan Mayen', value: 'SJ-Svalbard and Jan Mayen' },
  { title: 'Swaziland', value: 'SZ-Swaziland' },
  { title: 'Sweden', value: 'SE-Sweden' },
  { title: 'Switzerland', value: 'CH-Switzerland' },
  { title: 'Syrian Arab Republic', value: 'SY-Syrian Arab Republic' },
  { title: 'Taiwan', value: 'TW-Taiwan' },
  { title: 'Tajikistan', value: 'TJ-Tajikistan' },
  {
    title: 'Tanzania, United Republic of',
    value: 'TZ-Tanzania, United Republic of',
  },
  { title: 'Thailand', value: 'TH-Thailand' },
  { title: 'Timor-Leste', value: 'TL-Timor-Leste' },
  { title: 'Togo', value: 'TG-Togo' },
  { title: 'Tokelau', value: 'TK-Tokelau' },
  { title: 'Tonga', value: 'TO-Tonga' },
  { title: 'Trinidad and Tobago', value: 'TT-Trinidad and Tobago' },
  { title: 'Tunisia', value: 'TN-Tunisia' },
  { title: 'Turkey', value: 'TR-Turkey' },
  { title: 'Turkmenistan', value: 'TM-Turkmenistan' },
  { title: 'Turks and Caicos Islands', value: 'TC-Turks and Caicos Islands' },
  { title: 'Tuvalu', value: 'TV-Tuvalu' },
  { title: 'Uganda', value: 'UG-Uganda' },
  { title: 'Ukraine', value: 'UA-Ukraine' },
  { title: 'United Arab Emirates', value: 'AE-United Arab Emirates' },
  { title: 'United Kingdom', value: 'GB-United Kingdom' },
  { title: 'United States', value: 'US-United States' },
  {
    title: 'United States Minor Outlying Islands',
    value: 'UM-United States Minor Outlying Islands',
  },
  { title: 'Uruguay', value: 'UY-Uruguay' },
  { title: 'Uzbekistan', value: 'UZ-Uzbekistan' },
  { title: 'Vanuatu', value: 'VU-Vanuatu' },
  { title: 'Venezuela', value: 'VE-Venezuela' },
  { title: 'Viet Nam', value: 'VN-Viet Nam' },
  { title: 'Virgin Islands, British', value: 'VG-Virgin Islands, British' },
  { title: 'Virgin Islands, U.S.', value: 'VI-Virgin Islands, U.S.' },
  { title: 'Wallis and Futuna', value: 'WF-Wallis and Futuna' },
  { title: 'Western Sahara', value: 'EH-Western Sahara' },
  { title: 'Yemen', value: 'YE-Yemen' },
  { title: 'Zambia', value: 'ZM-Zambia' },
  { title: 'Zimbabwe', value: 'ZW-Zimbabwe' },
];

export default countries;
