import {getCountryCallingCode} from "react-phone-number-input";

export default function Flag({
                                          country,
                                          countryName,
                                          flags,
                                          flagUrl,
                                          ...rest
                                      }) {
    if (flags && flags[country]) {
        return flags[country]({ title: countryName })
    }

    return (
        <>
        <img
            {...rest}
            alt={countryName}
            role={countryName ? undefined : "presentation"}
            src={flagUrl.replace('{XX}', country).replace('{xx}', country.toLowerCase())}/>
            <div className="country-calling-code">+ {getCountryCallingCode(country)}</div>
        </>
    )
}



