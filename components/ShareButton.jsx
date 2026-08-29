import {
  FacebookShareButton,
  TelegramShareButton,
  EmailShareButton,
  WhatsappShareButton,
  XShareButton,
  FacebookIcon,
  TelegramIcon,
  EmailIcon,
  XIcon,
  WhatsappIcon,
} from "react-share";

const ShareButton = ({ property }) => {
  const shareUrl = `${process.env.NEXT_PRIVATE_DOMAIN}/properties/${property._id}`;
  return (
    <>
      <h3 className="text-xl font-bold text-center pt-2">
        Share This Property
      </h3>
      <div className="flex gap-3 justify-center pb-5">
        <FacebookShareButton
          url={shareUrl}
          quote={property.name}
          hashtag={`#${property.type}ForRent`}
        >
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>
        <TelegramShareButton url={shareUrl} title={property.name}>
          <TelegramIcon size={40} round={true} />
        </TelegramShareButton>
        <EmailShareButton
          url={shareUrl}
          body={`Check out this property listing: ${shareUrl}`}
        >
          <EmailIcon size={40} round={true} />
        </EmailShareButton>
        <WhatsappShareButton
          url={shareUrl}
          quote={property.name}
          separator=":: "
        >
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>
        <XShareButton
          url={shareUrl}
          quote={property.name}
          hashtag={`#${property.type.replace(/\s/g, "")}ForRent`}
        >
          <XIcon size={40} round={true} />
        </XShareButton>
      </div>
    </>
  );
};

export default ShareButton;
