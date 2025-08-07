import { S_SorryMessage } from './styled';

const WeAreSorry = () => {
    return (
        <S_SorryMessage>
            Our site requires access to the browser&apos;s local storage and cookies to function properly.
            <br />
            Please, adjust your browser settings accordingly and after that try to login again.
            <ul>
                <li>
                    For Safari (v14):
                    <ol>
                        <li>In the Safari app on your Mac, choose Safari &gt; Preferences, then click Privacy.</li>
                        <li>Unselect &quot;Block all cookies.&quot;</li>
                    </ol>
                </li>
                <li>
                    For Chrome (v89):
                    <ol>
                        <li>On your computer, open Chrome.</li>
                        <li>At the top right, click More. Settings.</li>
                        <li>Under &quot;Privacy and security&quot;, click Cookies and other site data.</li>
                        <li>Select an option: &quot;Allow all cookies&quot;.</li>
                    </ol>
                </li>
                <li>
                    For Firefox (v84):
                    <ol>
                        <li>On your computer, open Firefox.</li>
                        <li>At the top right, click Menu. Then Preferences.</li>
                        <li>Under &quot;Privacy and security&quot;, select Custom option.</li>
                        <li>Unselect Cookies option.</li>
                    </ol>
                </li>
            </ul>
        </S_SorryMessage>
    );
};

export default WeAreSorry;
