import { component } from '../../common/component';
import { createCssMeta } from '../../css/createCssMeta';
import { Unstyled } from '../../types/Unstyled';
import { Button } from '../Button';

const css = createCssMeta('Dialog');

interface DialogProps {}

export const Dialog = component(css, (props: Unstyled<DialogProps>) => (
  <div {...props}>
    <Button variant="outline">Ok</Button>
  </div>
));
