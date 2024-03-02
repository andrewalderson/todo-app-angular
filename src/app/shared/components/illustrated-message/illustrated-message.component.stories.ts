import type { Meta, StoryObj } from '@storybook/angular';
import { IllustratedMessageComponent } from './illustrated-message.component';

const meta: Meta<IllustratedMessageComponent> = {
  component: IllustratedMessageComponent,
  title: 'Components/IllustratedMessage',
  parameters: {
    layout: 'centered',
  },
};
export default meta;
type Story = StoryObj<IllustratedMessageComponent>;

export const Primary: Story = {
  render: (args: IllustratedMessageComponent) => ({
    props: args,
    template: `<todo-illustrated-message [heading]="heading" [description]="description">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="240px" viewBox="0 0 993.73022 422.32217" xmlns:xlink="http://www.w3.org/1999/xlink">
        <path d="M608.03796,422.32217h-221.40814c-6.26141,0-11.35526-5.0943-11.35526-11.35526V11.35525c0-6.26094,5.09384-11.35525,11.35526-11.35525h221.40814c6.26141,0,11.35522,5.09431,11.35522,11.35525V410.96692c0,6.26093-5.09381,11.35526-11.35522,11.35526ZM473.16803,1.89625c-53.01779,0-95.99719,42.97942-95.99719,95.99722V410.96692c0,5.22406,4.23495,9.45901,9.45901,9.45901h221.40811c5.22406,0,9.45898-4.23492,9.45898-9.45898V11.35525c0-5.22407-4.23492-9.45901-9.45898-9.45901h-134.86993Z" fill="#e6e6e6"/>
        <path d="M618.24402,105.3093c0,.67684,.75897,1.2203,1.70404,1.2203h292.52301c.94501,0,1.70398-.54346,1.70398-1.2203,0-.67678-.75897-1.2203-1.70398-1.2203h-292.52307c-.94513,0-1.70404,.54352-1.70404,1.2203h.00006Z" fill="#e6e6e6"/>
        <polygon points="380.33884 279.58173 383.23392 356.30087 376.18716 356.30087 376.18716 364.98608 395.88272 364.98608 395.88272 356.30087 390.13818 356.30087 390.54849 279.58173 380.33884 279.58173" fill="#3f3d56"/>
        <path d="M372.73932,343.99686h-.00003c2.99792,0,5.42825,2.43033,5.42825,5.42825v22.43671c0,2.99792-2.43033,5.42825-5.42825,5.42825h.00003c-2.99792,0-5.42825-2.43033-5.42825-5.42825v-22.43671c0-2.99792,2.43033-5.42825,5.42825-5.42825Z" fill="#3f3d56"/>
        <path d="M400.2424,343.99686h-.00003c2.99792,0,5.42825,2.43033,5.42825,5.42825v22.43671c0,2.99792-2.43033,5.42825-5.42825,5.42825h.00003c-2.99792,0-5.42825-2.43033-5.42825-5.42825v-22.43671c0-2.99792,2.43033-5.42825,5.42825-5.42825Z" fill="#3f3d56"/>
        <polygon points="444.39209 231.78143 332.93219 226.71507 350.30258 218.75365 448.01093 220.20119 444.39209 231.78143" fill="currentColor"/>
        <polygon points="0 243.03156 13.4609 237.96519 431.36432 248.82169 448.73471 240.86026 441.49704 290.07632 109.53795 254.70364 0 243.03156" fill="currentColor"/>
        <polygon points="107.4792 271.6203 109.53795 254.70364 441.49704 290.07632 439.68762 315.04623 107.4792 271.6203" fill="#3f3d56"/>
        <ellipse cx="330.76089" cy="285.00998" rx="34.37888" ry="36.55017" fill="#3f3d56"/>
        <circle cx="330.76089" cy="278.49609" r="25.33179" fill="currentColor"/>
        <polygon points="613.39136 279.58173 610.49634 356.30087 617.54303 356.30087 617.54303 364.98608 597.84753 364.98608 597.84753 356.30087 603.59204 356.30087 603.1817 279.58173 613.39136 279.58173" fill="#3f3d56"/>
        <rect x="615.56262" y="343.99686" width="10.85651" height="33.29321" rx="5.42822" ry="5.42822" fill="#3f3d56"/>
        <rect x="588.05963" y="343.99686" width="10.85651" height="33.29321" rx="5.42822" ry="5.42822" fill="#3f3d56"/>
        <polygon points="549.33813 231.78143 660.79803 226.71507 643.42767 218.75365 545.7193 220.20119 549.33813 231.78143" fill="currentColor"/>
        <polygon points="509.44403 216.18808 504.37772 104.72817 496.41629 122.09854 497.8638 219.8069 509.44403 216.18808" fill="currentColor"/>
        <polygon points="993.73022 243.03156 980.26935 237.96519 562.36591 248.82169 544.99554 240.86026 552.23315 290.07632 884.19226 254.70364 993.73022 243.03156" fill="currentColor"/>
        <polygon points="886.25104 271.6203 884.19226 254.70364 552.23315 290.07632 554.0426 315.04623 886.25104 271.6203" fill="#3f3d56"/>
        <ellipse cx="662.96936" cy="285.00998" rx="34.37885" ry="36.55017" fill="#3f3d56"/>
        <circle cx="662.96936" cy="278.49609" r="25.33179" fill="currentColor"/>
        <path d="M560.01367,217.89745l-1.64294,12.10632-.854,65.16789c-.06519,4.84918-.65143,9.64053-1.75153,14.28714-3.1701,13.53439-10.57422,25.84564-21.51038,34.76971-9.92279,8.10614-23.45718,14.24365-41.37039,13.15802-47.76852-2.89505-51.9881-43.54901-51.9881-43.54901l1.80219-73.72276,.24609-10.11098,2.1713-18.24385s5.79013-51.38736,59.34879-49.93983c53.55869,1.44753,55.54898,56.07735,55.54898,56.07735Z" fill="currentColor"/>
        <polygon points="456.69611 200.90344 467.55261 183.53307 481.30414 179.19048 528.34894 179.19048 539.9292 183.53307 550.43805 200.90344 531.24396 192.21826 477.40039 192.21826 456.69611 200.90344" fill="#e6e6e6"/>
        <g><polygon points="496.50888 325.78528 498.36609 375.00134 493.84552 375.00134 493.84552 380.57297 506.48041 380.57297 506.48041 375.00134 502.79523 375.00134 503.05847 325.78528 496.50888 325.78528" fill="#3f3d56"/>
        <path d="M491.6337,367.10818h0c1.92322,0,3.48227,1.55905,3.48227,3.48227v14.39337c0,1.92322-1.55905,3.48227-3.48227,3.48227h0c-1.92322,0-3.48227-1.55905-3.48227-3.48227v-14.39337c0-1.92322,1.55905-3.48227,3.48227-3.48227Z" fill="#3f3d56"/>
        <path d="M509.27719,367.10818h0c1.92322,0,3.48227,1.55905,3.48227,3.48227v14.39337c0,1.92322-1.55905,3.48227-3.48227,3.48227h0c-1.92322,0-3.48227-1.55905-3.48227-3.48227v-14.39337c0-1.92322,1.55905-3.48227,3.48227-3.48227Z" fill="#3f3d56"/>
        </g>
        <rect x="460.31845" y="185.7903" width="37.36307" height="1.99969" transform="translate(170.83368 598.33002) rotate(-74.47739)" fill="currentColor"/><rect x="529.99975" y="174.10844" width="2.00043" height="37.3632" transform="translate(-27.20847 106.00117) rotate(-11.11698)" fill="currentColor"/>
        <circle cx="734.41626" cy="103.75365" r="13" fill="currentColor"/><circle cx="374.6018" cy="146.30627" r="13" fill="currentColor"/>
        path d="M80.244,390.3093c0,.67685,.75895,1.22031,1.70405,1.22031H374.4711c.94501,0,1.70398-.54346,1.70398-1.22031,0-.67679-.75894-1.22031-1.70398-1.22031H81.94805c-.9451,0-1.70405,.54352-1.70405,1.22031Z" fill="#e6e6e6"/>
        <circle cx="196.41629" cy="388.75366" r="13" fill="currentColor"/>
      </svg>
    </todo-illustrated-message>`,
  }),
  args: {
    heading: 'This is the heading',
    description: 'This is the description',
  },
};
