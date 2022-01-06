import styled from 'styled-components';
import { Delete } from '@styled-icons/fluentui-system-filled/Delete';
import { Github } from '@styled-icons/boxicons-logos/Github';
import { SignOut } from '@styled-icons/octicons/SignOut';
import { UserDelete } from '@styled-icons/typicons/UserDelete';
import { SadTear } from '@styled-icons/fa-regular/SadTear';
import { Edit } from '@styled-icons/evaicons-solid/Edit';
import { FileExport } from '@styled-icons/boxicons-solid/FileExport';
import IconSearch from '../../assets/svg/icon_search.svg';
import IconClose from '../../assets/svg/icon_close.svg';
import IconCode from '../../assets/svg/icon_code.svg';
import IconCommunity from '../../assets/svg/icon_users.svg';
import AluraDevLogo from '../../assets/svg/logo.svg';
import IconComment from '../../assets/svg/icon_comment.svg';
import IconHeart from '../../assets/svg/icon_heart.svg';

const defaultWH = `
  width: 1.5rem;
  height: 1.5rem;
`;
const defaultWH2 = `
  width: 1.5rem;
  height: 1.5rem;
`;

const defaultBfrAftMenu = `
  content: '';
  background-color: #FFF;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 3px;
`;
export const SadGuyIcon = styled(SadTear)`
  width: 30%;
  margin-top: 3rem;
  /* color: #FFBD2E; */
`;
export const AluraDev = styled(AluraDevLogo)`
  width: 9.063rem;
  height: 2.125rem;
  margin-top: 1.5px;
  margin-right: 2rem;
`;
export const GithubIcon = styled(Github)`
  ${defaultWH2}
`;
export const SignOutIcon = styled(SignOut)`
  ${defaultWH2}
`;
export const DeleteAccountIcon = styled(UserDelete)`
  ${defaultWH2}
`;
export const DeleteIcon = styled(Delete)`
  ${defaultWH2}
  margin-bottom: 3px;
  margin-right: .5rem;
`;
export const CodeIcon = styled(IconCode)`
  ${defaultWH};
`;
export const CommunityIcon = styled(IconCommunity)`
  ${defaultWH};
`;
export const SearchIcon = styled(IconSearch)`
  ${defaultWH};
`;
export const CloseIcon = styled(IconClose)`
  ${defaultWH};
`;
export const CommentIcon = styled(IconComment)`
  ${defaultWH};
`;
export const HeartIcon = styled(IconHeart)`
  ${defaultWH};
`;
export const ExportIcon = styled(FileExport)`
  ${defaultWH};
  transform: scale(1.2);
`;
export const EditIcon = styled(Edit)`
  ${defaultWH};
  transform: scale(1.2);
`;
export const MenuIcon = styled.label`
  margin-left: 2rem;
  cursor: pointer;

  .MenuIcon__line {
    display: block;
    position: relative;
    background-color: #FFF;
    height: 3.21px;
    width: 20px;
    border-radius: 1px;
    animation: closeMid .8s reverse;
    transition: background .8s ease;

    ::before {
      transform: translateY(-7px);
      animation: closeTop .8s reverse;
      transition: background .8s ease;
      ${defaultBfrAftMenu}
    }
    ::after {
      transform: translateY(7px);
      transition: 0.8s ease-in-out;
      ${defaultBfrAftMenu}
    }
  }

  @keyframes openTop {
    0%{
      transform: translateY(-5px)
      rotate(0deg);
    }
    50%{
      transform: translateY(0px)
      rotate(0deg);
    }
    100%{
      width: 100%;
      height: 4px;
      transform: translateY(0px)
      rotate(90deg);
    }
  }
  @keyframes closeTop {
    0%{
      transform: translateY(-5px)
      rotate(0deg);
    }
    50%{
      transform: translateY(0px)
      rotate(0deg);
    }
    100%{
      width: 100%;
      height: 4px;
      transform: translateY(0px)
      rotate(90deg);
    }
  }

  @keyframes openMid {
    from{
      transform: rotate(0deg);
    }
    to{
      height: 4px;
      transform: rotate(45deg);
    }
  }
  @keyframes closeMid {
    from{
      transform: rotate(0deg);
    }
    to{
      height: 4px;
      transform: rotate(45deg);
    }
  }
`;
