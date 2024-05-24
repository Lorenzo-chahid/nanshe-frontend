import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSmile,
  faBolt,
  faShieldAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'react-tooltip';
import './css/SkillTree.css'; // Assurez-vous de créer et utiliser ce fichier CSS

const skills = [
  {
    id: 1,
    icon: faSmile,
    levelRequired: 5,
    name: 'Emoji',
    description: 'Use emojis in messages',
  },
  {
    id: 2,
    icon: faBolt,
    levelRequired: 5,
    name: 'Seen 1',
    description: 'Reduce seen delay by 5%',
  },
  {
    id: 3,
    icon: faBolt,
    levelRequired: 10,
    name: 'Seen 2',
    description: 'Reduce seen delay by 10%',
  },
  {
    id: 4,
    icon: faShieldAlt,
    levelRequired: 10,
    name: 'Answer 1',
    description: 'Increase response speed by 2%',
  },
  {
    id: 5,
    icon: faShieldAlt,
    levelRequired: 15,
    name: 'Answer 2',
    description: 'Increase response speed by 7%',
  },
  {
    id: 6,
    icon: faShieldAlt,
    levelRequired: 20,
    name: 'Answer 3',
    description: 'Increase response speed by 12%',
  },
];

const SkillTree = ({ avatar }) => {
  const handleSkillClick = skill => {
    if (avatar.level >= skill.levelRequired) {
      alert(`Skill ${skill.name} unlocked!`);
    } else {
      alert(`Level ${skill.levelRequired} required to unlock this skill.`);
    }
  };

  return (
    <div className="skill-tree-container">
      {skills.map(skill => (
        <div
          key={skill.id}
          className={`skill-node ${
            avatar.level >= skill.levelRequired ? 'unlocked' : 'locked'
          }`}
          onClick={() => handleSkillClick(skill)}
          data-tooltip-id={`tooltip-${skill.id}`}
          data-tooltip-content={`${skill.description} (Requires Level ${skill.levelRequired})`}
        >
          <FontAwesomeIcon icon={skill.icon} size="2x" />
          <Tooltip id={`tooltip-${skill.id}`} />
        </div>
      ))}
    </div>
  );
};

export default SkillTree;
