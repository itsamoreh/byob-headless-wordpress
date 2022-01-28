import PropTypes from 'prop-types'

export default function ArchiveHeader({
  imageUrl,
  imageAlt,
  preposition,
  title,
  description,
}) {
  return (
    <header className="bg-block-pattern -mt-[7.75rem]">
      <div className="container mx-auto mb-10 flex flex-col md:mb-16">
        <div className="mx-auto max-w-md py-16 text-center md:max-w-none md:py-32 md:text-left">
          {imageUrl && (
            <img
              className="mx-auto mb-4 aspect-[1/1] h-48 w-48 rounded-full object-cover shadow-md [shape-outside:circle()] md:float-left md:mb-0 md:mr-10"
              src={imageUrl}
              alt={imageAlt || ''}
            />
          )}
          <h1 className="break-words text-3xl font-extrabold leading-tight md:text-4xl">
            {preposition}{' '}
            <span className="text-4xl text-indigo-600 md:text-5xl">
              {title}
            </span>
          </h1>

          {description && (
            <p className="mt-2 max-w-[75ch] text-sm text-gray-600 md:mt-4 md:text-base">
              {description}
            </p>
          )}
        </div>
      </div>
    </header>
  )
}

ArchiveHeader.propTypes = {
  imageUrl: PropTypes.string,
  imageAlt: PropTypes.string,
  preposition: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
}

ArchiveHeader.defaultProps = {
  preposition: '',
  title: '',
}
