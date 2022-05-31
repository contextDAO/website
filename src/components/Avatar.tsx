import { Image } from '@chakra-ui/react';

const avatars = [
  `./avatar/kidaha-01.svg`,
  `./avatar/kidaha-02.svg`,
  `./avatar/kidaha-03.svg`,
  `./avatar/kidaha-04.svg`,
  `./avatar/kidaha-05.svg`,
  `./avatar/kidaha-06.svg`,
  `./avatar/kidaha-07.svg`,
  `./avatar/kidaha-08.svg`,
  `./avatar/kidaha-09.svg`,
  `./avatar/kidaha-10.svg`,
  `./avatar/kidaha-11.svg`,
  `./avatar/kidaha-12.svg`,
];

interface Props {
  indexOfContributor: number;
}

const Avatar = (props: Props) => {
  const { indexOfContributor } = props;
  return (
    <div>
      <Image
        src={avatars[indexOfContributor]}
        style={{ width: `32px` }}
        alt={`avatar`}
      />
    </div>
  );
};

export default Avatar;
