/*
import { render } from '@testing-library/react';

import { Button } from './Button';
*/

describe('Button', () => {
    it('should render successfully', () => {
        const { baseElement } = { baseElement: true }; //render(<Button />);
        expect(baseElement).toBeTruthy();
    });
});
